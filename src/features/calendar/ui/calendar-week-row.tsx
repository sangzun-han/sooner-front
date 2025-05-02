import { CalendarDayCell } from "./calendar-day-cell";

interface CalendarWeekRowProps {
  week: (Date | null)[];
  selectedDates: number[];
  onDateToggle: (date: Date) => void;
  limitDate?: number;
}

export function CalendarWeekRow({ week, selectedDates, onDateToggle, limitDate }: CalendarWeekRowProps) {
  const isSelected = (date: Date) => selectedDates.includes(date.getTime());
  const isDisabled = (date: Date) => limitDate !== undefined && date.getTime() > limitDate;

  return (
    <div className="grid grid-cols-7">
      {week.map((day, i) =>
        day ? (
          <CalendarDayCell
            key={i}
            date={day}
            isSelected={isSelected(day)}
            isDisabled={isDisabled(day)}
            onClick={onDateToggle}
          />
        ) : (
          <div key={i}></div>
        )
      )}
    </div>
  );
}
