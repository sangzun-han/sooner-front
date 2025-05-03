import { getDaysInMonth } from "../libs";
import { CalendarWeekRow } from "./";

interface CalendarBodyProps {
  currentMonth: Date;
  selectedDates: number[];
  onDateToggle: (date: Date) => void;
  limitDate?: number;
}

export default function CalendarBody({ currentMonth, selectedDates, onDateToggle, limitDate }: CalendarBodyProps) {
  const days = getDaysInMonth(currentMonth);
  const rows = [];

  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div className="border-t border-gray-200">
      {rows.map((week, i) => (
        <CalendarWeekRow
          key={i}
          week={week}
          selectedDates={selectedDates}
          onDateToggle={onDateToggle}
          limitDate={limitDate}
        />
      ))}
    </div>
  );
}
