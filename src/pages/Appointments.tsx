import { useState } from "react";
import { Calendar, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import CancelForm from "@/components/appointments/CancelForm";
import { useAppointments } from "@/hooks/useAppointments";

const Appointments = () => {
  const {
    loading,
    getDateRange,
    isSlotAvailable,
    bookAppointment,
    findClientAppointments,
    cancelAppointment,
    refetch,
  } = useAppointments();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelectSlot = (date: Date, time: string) => {
    if (isSlotAvailable(date, time)) {
      setSelectedDate(date);
      setSelectedTime(time);
    }
  };

  const handleClearSelection = () => {
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBookAppointment = async (
    name: string,
    email: string,
    phone: string
  ): Promise<boolean> => {
    if (!selectedDate || !selectedTime) return false;
    return await bookAppointment(selectedDate, selectedTime, name, email, phone);
  };

  const dates = getDateRange();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Sistema de Citas</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="agendar" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="agendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Agendar Cita
            </TabsTrigger>
            <TabsTrigger value="cancelar" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Cancelar Cita
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agendar" className="space-y-8">
            {/* Calendar View */}
            <AppointmentCalendar
              dates={dates}
              isSlotAvailable={isSlotAvailable}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectSlot={handleSelectSlot}
              loading={loading}
              onRefresh={refetch}
            />

            {/* Booking Form */}
            <div className="max-w-md mx-auto">
              <AppointmentForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleBookAppointment}
                onClearSelection={handleClearSelection}
              />
            </div>
          </TabsContent>

          <TabsContent value="cancelar">
            <div className="max-w-md mx-auto">
              <CancelForm
                onSearch={findClientAppointments}
                onCancel={cancelAppointment}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Appointments;
