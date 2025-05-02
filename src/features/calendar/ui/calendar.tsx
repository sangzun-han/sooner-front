import { CalendarBody } from "./calendar-body";
import { CalendarHeader } from "./calendar-header";
import { CalendarWeekdays } from "./calendar-weekdays";

interface CalendarProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
  selectedDates: number[];
  onDateToggle: (date: Date) => void;
  limitDate?: number;
}

export function Calendar({ currentMonth, onMonthChange, selectedDates, onDateToggle, limitDate }: CalendarProps) {
  return (
    <div className="w-full">
      <CalendarHeader currentMonth={currentMonth} onMonthChange={onMonthChange} />
      <CalendarWeekdays />
      <CalendarBody
        currentMonth={currentMonth}
        selectedDates={selectedDates}
        onDateToggle={onDateToggle}
        limitDate={limitDate}
      />
    </div>
  );
}
