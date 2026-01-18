import { format, isToday, isTomorrow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeSlot from "./TimeSlot";
import { ALL_TIME_SLOTS } from "@/hooks/useAppointments";

interface DayCardProps {
  date: Date;
  isSlotAvailable: (date: Date, time: string) => boolean;
  selectedDate?: Date | null;
  selectedTime?: string | null;
  onSelectSlot?: (date: Date, time: string) => void;
  loading?: boolean;
}

const DayCard = ({
  date,
  isSlotAvailable,
  selectedDate,
  selectedTime,
  onSelectSlot,
  loading = false,
}: DayCardProps) => {
  const getDayLabel = () => {
    if (isToday(date)) return "Hoy";
    if (isTomorrow(date)) return "Mañana";
    return format(date, "EEEE", { locale: es });
  };

  const availableCount = ALL_TIME_SLOTS.filter((time) =>
    isSlotAvailable(date, time)
  ).length;

  const isDateSelected = selectedDate?.toDateString() === date.toDateString();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-secondary/30">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="capitalize">{getDayLabel()}</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {format(date, "dd MMM", { locale: es })}
          </span>
        </CardTitle>
        <div className="text-xs text-muted-foreground">
          {availableCount === 0 ? (
            <span className="text-destructive">Sin disponibilidad</span>
          ) : (
            <span className="text-green-600">
              {availableCount} horario{availableCount > 1 ? "s" : ""} disponible
              {availableCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-2">
          {ALL_TIME_SLOTS.map((time) => (
            <TimeSlot
              key={time}
              time={time}
              isAvailable={isSlotAvailable(date, time)}
              isSelected={isDateSelected && selectedTime === time}
              onClick={() => onSelectSlot?.(date, time)}
              disabled={loading}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DayCard;
