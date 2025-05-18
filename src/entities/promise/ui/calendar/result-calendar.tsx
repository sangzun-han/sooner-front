import { VoteStatusMap } from "../../types/promise.types";
import { CalendarHeader, CalendarWeekdays, ResultCalendarMonthGrid } from "@/entities/promise/ui/calendar";
import { useMonthNavigation } from "@/entities/promise/hooks";

interface ResultCalendarProps {
  voteStatusMap: VoteStatusMap;
  availableDates: string[];
  unavailableDates: string[];
  startDate: Date;
  endDate: Date;
}

export default function ResultCalendar({
  voteStatusMap,
  availableDates,
  unavailableDates,
  startDate,
  endDate,
}: ResultCalendarProps) {
  const { currentMonth, goToMonth } = useMonthNavigation(startDate, endDate);

  return (
    <div className="w-full select-none">
      <CalendarHeader month={currentMonth} setMonth={goToMonth} />
      <CalendarWeekdays />
      <ResultCalendarMonthGrid
        month={currentMonth}
        voteStatusMap={voteStatusMap}
        availableDates={availableDates}
        unavailableDates={unavailableDates}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
