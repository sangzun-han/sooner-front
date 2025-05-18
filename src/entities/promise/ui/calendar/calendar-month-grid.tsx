import { cn } from "@/shared/lib/utils";
import { useCalendarConfig } from "../../model/use-calendar-config";
import { generateMonthCells } from "../../utils/generate-month-cells";

interface CalendarMonthGridProps {
  month: Date;
}

export default function CalendarMonthGrid({ month }: CalendarMonthGridProps) {
  const { value: selectedTimestamps, onChange, mode, range, disabled: blockedTimestamps = [] } = useCalendarConfig();

  const monthCells = generateMonthCells(month);

  /* ───────── 판별 함수 ───────── */
  const isDisabled = (ts: number) =>
    ts < range.start || ts > range.end || (mode === "unavailable" && blockedTimestamps.includes(ts));

  const isSelected = (ts: number) => selectedTimestamps.includes(ts);

  /* ───────── 토글 핸들러 ───────── */
  const toggleSelection = (date: Date) => {
    const ts = date.getTime();
    if (isDisabled(ts)) return;

    const updated = isSelected(ts) ? selectedTimestamps.filter((v) => v !== ts) : [...selectedTimestamps, ts];

    onChange(updated);
  };

  /* ───────── 렌더 ───────── */
  return (
    <div className="border-t border-gray-200">
      <div className="grid grid-cols-7">
        {monthCells.map((cell, idx) =>
          cell ? (
            <div className="py-2 text-center" key={idx}>
              <div className="flex flex-col items-center">
                <button
                  key={cell.getTime()}
                  onClick={() => toggleSelection(cell)}
                  disabled={isDisabled(cell.getTime())}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors",
                    isDisabled(cell.getTime()) && "cursor-not-allowed bg-gray-50 text-gray-400",
                    isSelected(cell.getTime()) && "bg-primary/90 text-white",
                    !isDisabled(cell.getTime()) && !isSelected(cell.getTime()) && "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {cell.getDate()}
                </button>
              </div>
            </div>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
}
