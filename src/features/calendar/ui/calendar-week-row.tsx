import { CalendarDayCell } from ".";

interface CalendarWeekRowProps {
  week: (Date | null)[];
  selectedDates: number[];
  onDateToggle: (date: Date) => void;
  limitStart?: number;
  limitEnd?: number;
  disabledDates?: number[];
}

export default function CalendarWeekRow({
  week,
  selectedDates,
  onDateToggle,
  limitStart,
  limitEnd,
  disabledDates,
}: CalendarWeekRowProps) {
  const isSelected = (date: Date) => {
    const time = date.getTime();
    return selectedDates.includes(time);
  };

  const isDisabled = (date: Date) => {
    const timestamp = date.getTime();

    return (
      (limitStart !== undefined && timestamp < limitStart) ||
      (limitEnd !== undefined && timestamp > limitEnd) ||
      (disabledDates?.includes(timestamp) ?? false)
    );
  };

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
