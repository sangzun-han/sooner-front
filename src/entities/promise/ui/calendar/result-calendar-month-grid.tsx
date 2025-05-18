import { cn } from "@/shared/lib/utils";
import { generateMonthCells } from "@/entities/promise/utils";
import { VoteStatusMap } from "../../types/promise.types";

interface ResultCalendarBodyProps {
  month: Date;
  voteStatusMap: VoteStatusMap;
  availableDates: string[];
  unavailableDates: string[];
  startDate: Date;
  endDate: Date;
}

export default function ResultCalendarMonthGrid({
  month,
  voteStatusMap,
  //   availableDates,
  //   unavailableDates,
  startDate,
  endDate,
}: ResultCalendarBodyProps) {
  const monthCells = generateMonthCells(month);
  const isDisabled = (timestamp: number) => timestamp < startDate.getTime() || timestamp > endDate.getTime();

  const normalizeDate = (date: Date): string => {
    const yyyyMMdd = date.toLocaleDateString("sv-SE");
    return new Date(yyyyMMdd).getTime().toString();
  };

  return (
    <div className="border-t border-gray-200">
      <div className="grid grid-cols-7">
        {monthCells.map((cell, idx) =>
          cell ? (
            <div className="py-2 text-center" key={idx}>
              <div className="flex flex-col items-center">
                <button
                  key={cell.getTime()}
                  onClick={() => console.log(cell)}
                  disabled={isDisabled(cell.getTime())}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors",
                    isDisabled(cell.getTime()) && "cursor-not-allowed bg-gray-50 text-gray-400",
                    !isDisabled(cell.getTime()) && "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {cell.getDate()}
                </button>

                {/* ✅ 투표 상태 표시 */}
                {voteStatusMap && (
                  <div className="mt-[2px] h-[20px] w-[40px] flex flex-col items-center gap-[2px]">
                    {[0, 1].map((line) => {
                      const lineUsers =
                        voteStatusMap[normalizeDate(cell)]?.available.slice(line * 4, line * 4 + 4) ?? [];
                      if (lineUsers.length === 0) return null;

                      const totalWidth = 16 + (lineUsers.length - 1) * 12;
                      const leftOffset = (40 - totalWidth) / 2;

                      return (
                        <div key={line} className="relative h-4 w-full">
                          {lineUsers.map((user, i) => (
                            <img
                              key={user.id}
                              src={user.profileImage}
                              alt={user.name}
                              className="w-4 h-4 rounded-full border border-white absolute"
                              style={{
                                left: `${leftOffset + i * 12}px`,
                                zIndex: 100 - i,
                              }}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
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
