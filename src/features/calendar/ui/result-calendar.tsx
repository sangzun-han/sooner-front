import { VoteStatusMap } from "@/entities/votes";
import { CalendarHeader, CalendarWeekdays, ResultCalendarBody } from "./";

interface ResultCalendarProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
  voteStatusMap: VoteStatusMap;
  limitStart?: number;
  limitEnd?: number;
  onDateClick?: (date: Date) => void;
}

export default function ResultCalendar({
  currentMonth,
  onMonthChange,
  voteStatusMap,
  limitStart,
  limitEnd,
  onDateClick,
}: ResultCalendarProps) {
  return (
    <div className="w-full">
      <CalendarHeader currentMonth={currentMonth} onMonthChange={onMonthChange} />
      <CalendarWeekdays />
      <ResultCalendarBody
        currentMonth={currentMonth}
        voteStatusMap={voteStatusMap}
        limitStart={limitStart}
        limitEnd={limitEnd}
        onDateClick={onDateClick}
      />
    </div>
  );
}
