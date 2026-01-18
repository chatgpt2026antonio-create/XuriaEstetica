import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search, Loader2, XCircle, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Appointment, formatTimeForDisplay } from "@/hooks/useAppointments";

interface CancelFormProps {
  onSearch: (term: string) => Promise<Appointment[]>;
  onCancel: (appointment: Appointment) => Promise<boolean>;
}

const CancelForm = ({ onSearch, onCancel }: CancelFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searched, setSearched] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmAppointment, setConfirmAppointment] = useState<Appointment | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearching(true);
    setSearched(false);
    
    const results = await onSearch(searchTerm.trim());
    setAppointments(results);
    setSearched(true);
    setSearching(false);
  };

  const handleCancelConfirm = async () => {
    if (!confirmAppointment) return;

    setCancellingId(confirmAppointment.id);
    const success = await onCancel(confirmAppointment);
    
    if (success) {
      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== confirmAppointment.id)
      );
    }
    
    setCancellingId(null);
    setConfirmAppointment(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            Cancelar Cita
          </CardTitle>
          <CardDescription>
            Busca tu cita por email o teléfono para cancelarla
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Buscar
              </Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Email o teléfono"
                disabled={searching}
              />
            </div>
            <Button type="submit" disabled={searching || !searchTerm.trim()}>
              {searching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>

          {searched && appointments.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <p>No se encontraron citas activas</p>
              <p className="text-sm">Verifica el email o teléfono ingresado</p>
            </div>
          )}

          {appointments.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium">
                {appointments.length} cita{appointments.length > 1 ? "s" : ""} encontrada{appointments.length > 1 ? "s" : ""}:
              </p>
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 border rounded-lg bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(new Date(apt.appointment_date), "EEEE dd 'de' MMMM yyyy", {
                          locale: es,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatTimeForDisplay(apt.appointment_time.substring(0, 5))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{apt.client_name}</span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmAppointment(apt)}
                    disabled={cancellingId === apt.id}
                  >
                    {cancellingId === apt.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cancelando...
                      </>
                    ) : (
                      "Cancelar Cita"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!confirmAppointment} onOpenChange={() => setConfirmAppointment(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar esta cita?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La cita del{" "}
              {confirmAppointment && (
                <strong>
                  {format(
                    new Date(confirmAppointment.appointment_date),
                    "dd 'de' MMMM",
                    { locale: es }
                  )}{" "}
                  a las{" "}
                  {formatTimeForDisplay(
                    confirmAppointment.appointment_time.substring(0, 5)
                  )}
                </strong>
              )}{" "}
              será cancelada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sí, cancelar cita
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CancelForm;
