import { VoteStatusMap } from "@/entities/votes";
import { ResultCalendarDayCell } from "./";

interface ResultCalendarWeekRowProps {
  week: (Date | null)[];
  voteStatusMap: VoteStatusMap;
  limitStart?: number;
  limitEnd?: number;
  onDateClick?: (date: Date) => void;
}

export default function ResultCalendarWeekRow({
  week,
  voteStatusMap,
  limitStart,
  limitEnd,
  onDateClick,
}: ResultCalendarWeekRowProps) {
  const isDisabled = (date: Date) => {
    const timestamp = date.getTime();
    return (limitStart !== undefined && timestamp < limitStart) || (limitEnd !== undefined && timestamp > limitEnd);
  };

  return (
    <div className="grid grid-cols-7">
      {week.map((day, i) =>
        day ? (
          <ResultCalendarDayCell
            key={i}
            date={day}
            isDisabled={isDisabled(day)}
            voteStatusMap={voteStatusMap}
            onClick={onDateClick}
          />
        ) : (
          <div key={i}></div>
        )
      )}
    </div>
  );
}
