import { cn } from "@/shared/lib/utils";

interface CalendarDayCellProps {
  date: Date;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (date: Date) => void;
}

export default function CalendarDayCell({ date, isSelected, isDisabled, onClick }: CalendarDayCellProps) {
  return (
    <div className="py-2 text-center">
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            onClick(date);
          }}
          disabled={isDisabled}
          className={cn(
            "w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors",
            isDisabled
              ? "text-gray-400 bg-gray-50 cursor-not-allowed"
              : isSelected
              ? "bg-primary/90 text-white"
              : "text-gray-800 hover:bg-gray-100"
          )}
        >
          {date.getDate()}
        </button>
      </div>
    </div>
  );
}
