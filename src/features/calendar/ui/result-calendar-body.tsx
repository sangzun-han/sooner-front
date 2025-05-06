import { VoteStatusMap } from "@/entities/votes";
import { getDaysInMonth } from "../utils";
import { ResultCalendarWeekRow } from "./";

interface ResultCalendarBodyProps {
  currentMonth: Date;
  voteStatusMap: VoteStatusMap;
  limitStart?: number;
  limitEnd?: number;
  onDateClick?: (date: Date) => void;
}

export default function ResultCalendarBody({
  currentMonth,
  voteStatusMap,
  limitStart,
  limitEnd,
  onDateClick,
}: ResultCalendarBodyProps) {
  const days = getDaysInMonth(currentMonth);
  const rows = [];

  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div className="border-t border-gray-200">
      {rows.map((week, i) => (
        <ResultCalendarWeekRow
          key={i}
          week={week}
          voteStatusMap={voteStatusMap}
          limitStart={limitStart}
          limitEnd={limitEnd}
          onDateClick={onDateClick}
        />
      ))}
    </div>
  );
}
