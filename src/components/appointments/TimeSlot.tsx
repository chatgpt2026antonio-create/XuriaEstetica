import { cn } from "@/lib/utils";
import { formatTimeForDisplay } from "@/hooks/useAppointments";

interface TimeSlotProps {
  time: string;
  isAvailable: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const TimeSlot = ({
  time,
  isAvailable,
  isSelected = false,
  onClick,
  disabled = false,
}: TimeSlotProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isAvailable || disabled}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        "border-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
        isAvailable && !isSelected && "border-green-500 bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-500",
        !isAvailable && "border-muted bg-muted text-muted-foreground cursor-not-allowed opacity-50",
        isSelected && "border-primary bg-primary text-primary-foreground focus:ring-primary",
        disabled && isAvailable && "opacity-50 cursor-wait"
      )}
    >
      {formatTimeForDisplay(time)}
    </button>
  );
};

export default TimeSlot;
