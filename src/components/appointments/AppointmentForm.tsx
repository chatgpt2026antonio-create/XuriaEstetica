import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeForDisplay } from "@/hooks/useAppointments";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(6, "Ingresa un teléfono válido"),
});

interface AppointmentFormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSubmit: (name: string, email: string, phone: string) => Promise<boolean>;
  onClearSelection: () => void;
}

const AppointmentForm = ({
  selectedDate,
  selectedTime,
  onSubmit,
  onClearSelection,
}: AppointmentFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const result = formSchema.safeParse({ name, email, phone });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const success = await onSubmit(name, email, phone);

    if (success) {
      setName("");
      setEmail("");
      setPhone("");
      onClearSelection();
    }

    setLoading(false);
  };

  if (!selectedDate || !selectedTime) {
    return (
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            Agendar Cita
          </CardTitle>
          <CardDescription>
            Selecciona un horario disponible del calendario para comenzar
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
          Agendar Cita
        </CardTitle>
        <CardDescription>
          Completa tus datos para confirmar la cita
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg mb-4">
            <p className="text-sm font-medium text-primary">
              Horario seleccionado:
            </p>
            <p className="text-lg font-semibold">
              {format(selectedDate, "EEEE dd 'de' MMMM", { locale: es })} -{" "}
              {formatTimeForDisplay(selectedTime)}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2 text-xs"
              onClick={onClearSelection}
            >
              Cambiar horario
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Agendando...
              </>
            ) : (
              "Confirmar Cita"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
