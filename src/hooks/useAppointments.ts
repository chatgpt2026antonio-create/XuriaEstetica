import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays, startOfDay, isBefore, isToday, parseISO } from "date-fns";
import { toast } from "@/hooks/use-toast";

export interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: string;
  created_at: string;
}

// Available time slots
const MORNING_SLOTS = ["08:00", "09:00", "10:00", "11:00"];
const AFTERNOON_SLOTS = ["16:00", "17:00", "18:00", "20:00"];
export const ALL_TIME_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];

export const formatTimeForDisplay = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatDateTimeForWebhook = (date: Date, time: string): string => {
  const dateStr = format(date, "yyyy-MM-dd");
  const timeStr = time.replace(":", "-");
  return `${dateStr}-${timeStr}`;
};

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate date range (today + 7 days)
  const getDateRange = useCallback(() => {
    const dates: Date[] = [];
    const today = startOfDay(new Date());
    for (let i = 0; i <= 7; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  }, []);

  // Fetch appointments
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const today = format(new Date(), "yyyy-MM-dd");
      const endDate = format(addDays(new Date(), 7), "yyyy-MM-dd");

      const { data, error: fetchError } = await supabase
        .from("appointments")
        .select("*")
        .gte("appointment_date", today)
        .lte("appointment_date", endDate)
        .eq("status", "active");

      if (fetchError) throw fetchError;
      setAppointments(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Error al cargar las citas");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if a slot is available
  const isSlotAvailable = useCallback(
    (date: Date, time: string): boolean => {
      const dateStr = format(date, "yyyy-MM-dd");
      
      // Check if the time has passed for today
      if (isToday(date)) {
        const now = new Date();
        const [hours, minutes] = time.split(":").map(Number);
        const slotTime = new Date(date);
        slotTime.setHours(hours, minutes, 0, 0);
        if (isBefore(slotTime, now)) {
          return false;
        }
      }

      // Check if already booked
      return !appointments.some(
        (apt) => apt.appointment_date === dateStr && apt.appointment_time === time + ":00"
      );
    },
    [appointments]
  );

  // Get available slots for a specific date
  const getAvailableSlots = useCallback(
    (date: Date): string[] => {
      return ALL_TIME_SLOTS.filter((time) => isSlotAvailable(date, time));
    },
    [isSlotAvailable]
  );

  // Book an appointment
  const bookAppointment = async (
    date: Date,
    time: string,
    clientName: string,
    clientEmail: string,
    clientPhone: string
  ): Promise<boolean> => {
    try {
      const dateStr = format(date, "yyyy-MM-dd");

      // Insert into Supabase
      const { data, error: insertError } = await supabase
        .from("appointments")
        .insert({
          appointment_date: dateStr,
          appointment_time: time + ":00",
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.code === "23505") {
          toast({
            title: "Horario no disponible",
            description: "Este horario ya fue reservado por otra persona.",
            variant: "destructive",
          });
          return false;
        }
        throw insertError;
      }

      // Send to webhook
      const webhookData = {
        datetime: formatDateTimeForWebhook(date, time),
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
      };

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        await fetch(
          "https://n8n.srv865543.hstgr.cloud/webhook-test/generador_de_citas",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(webhookData),
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);
      } catch (webhookError) {
        console.warn("Webhook notification failed:", webhookError);
        // Continue anyway - appointment is saved in DB
      }

      toast({
        title: "¡Cita agendada!",
        description: `Tu cita ha sido confirmada para el ${format(date, "dd/MM/yyyy")} a las ${formatTimeForDisplay(time)}`,
      });

      return true;
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast({
        title: "Error",
        description: "No se pudo agendar la cita. Intenta de nuevo.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Find appointments by email or phone
  const findClientAppointments = async (
    searchTerm: string
  ): Promise<Appointment[]> => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");

      const { data, error: searchError } = await supabase
        .from("appointments")
        .select("*")
        .eq("status", "active")
        .gte("appointment_date", today)
        .or(`client_email.ilike.%${searchTerm}%,client_phone.ilike.%${searchTerm}%`);

      if (searchError) throw searchError;
      return data || [];
    } catch (err) {
      console.error("Error searching appointments:", err);
      return [];
    }
  };

  // Cancel an appointment - sends to webhook and deletes from database
  const cancelAppointment = async (appointment: Appointment): Promise<boolean> => {
    try {
      // Send to webhook with all appointment info
      const webhookData = {
        datetime: `${appointment.appointment_date}-${appointment.appointment_time.substring(0, 5).replace(":", "-")}`,
        appointment_id: appointment.id,
        client_name: appointment.client_name,
        client_email: appointment.client_email,
        client_phone: appointment.client_phone,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
      };

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          "https://n8n.srv865543.hstgr.cloud/webhook-test/eliminar_citas",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(webhookData),
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Webhook responded with error");
        }
      } catch (webhookError) {
        console.error("Webhook notification failed:", webhookError);
        // Continue with deletion anyway - we don't want to block the user
      }

      // Delete the appointment from Supabase
      const { error: deleteError } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointment.id);

      if (deleteError) throw deleteError;

      toast({
        title: "Cita cancelada",
        description: "Tu cita ha sido eliminada. Recibirás un correo de confirmación.",
      });

      return true;
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      toast({
        title: "Error",
        description: "No se pudo cancelar la cita. Intenta de nuevo.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    fetchAppointments();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("appointments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    // Also poll every 30 seconds as backup
    const interval = setInterval(fetchAppointments, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    getDateRange,
    isSlotAvailable,
    getAvailableSlots,
    bookAppointment,
    findClientAppointments,
    cancelAppointment,
    refetch: fetchAppointments,
  };
};
