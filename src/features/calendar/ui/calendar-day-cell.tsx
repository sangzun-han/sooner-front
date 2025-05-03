import { Check } from "lucide-react";
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
        <button onClick={() => onClick(date)} disabled={isDisabled} className="w-full flex justify-center">
          <div
            className={cn(
              "w-6 h-6 border rounded-sm flex items-center justify-center",
              isSelected ? "bg-neutral-800 text-white border-neutral-800" : "border-gray-300 text-gray-800",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSelected && <Check className="w-3 h-3" />}
          </div>
        </button>
        <span className="text-xs mt-1">{date.getDate()}일</span>
      </div>
    </div>
  );
}
