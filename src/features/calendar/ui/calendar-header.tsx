import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

export default function CalendarHeader({ currentMonth, onMonthChange }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full mb-2">
      <button onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h3 className="text-base font-medium">
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </h3>
      <button onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
