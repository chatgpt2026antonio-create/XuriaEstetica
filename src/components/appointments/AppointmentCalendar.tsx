import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DayCard from "./DayCard";
import { Skeleton } from "@/components/ui/skeleton";

interface AppointmentCalendarProps {
  dates: Date[];
  isSlotAvailable: (date: Date, time: string) => boolean;
  selectedDate?: Date | null;
  selectedTime?: string | null;
  onSelectSlot?: (date: Date, time: string) => void;
  loading?: boolean;
  onRefresh?: () => void;
}

const AppointmentCalendar = ({
  dates,
  isSlotAvailable,
  selectedDate,
  selectedTime,
  onSelectSlot,
  loading = false,
  onRefresh,
}: AppointmentCalendarProps) => {
  if (loading && dates.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Disponibilidad - Próximos 7 días</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dates.map((date) => (
          <DayCard
            key={date.toISOString()}
            date={date}
            isSlotAvailable={isSlotAvailable}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectSlot={onSelectSlot}
            loading={loading}
          />
        ))}
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-50" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-muted bg-muted opacity-50" />
          <span>No disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary bg-primary" />
          <span>Seleccionado</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
