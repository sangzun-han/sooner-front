import { CalendarBody, CalendarHeader, CalendarWeekdays } from ".";

interface CalendarProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
  selectedDates: number[];
  onDateToggle: (date: Date) => void;
  limitStart?: number;
  limitEnd?: number;
  disabledDates?: number[];
}

export default function Calendar({
  currentMonth,
  onMonthChange,
  selectedDates,
  onDateToggle,
  limitStart,
  limitEnd,
  disabledDates,
}: CalendarProps) {
  return (
    <div className="w-full">
      <CalendarHeader currentMonth={currentMonth} onMonthChange={onMonthChange} />
      <CalendarWeekdays />
      <CalendarBody
        currentMonth={currentMonth}
        selectedDates={selectedDates}
        onDateToggle={onDateToggle}
        limitStart={limitStart}
        limitEnd={limitEnd}
        disabledDates={disabledDates}
      />
    </div>
  );
}
