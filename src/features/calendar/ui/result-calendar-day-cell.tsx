import { VoteStatusMap } from "@/entities/votes";
import { cn } from "@/shared/lib/utils";

const normalizeDate = (date: Date): string => {
  const yyyyMMdd = date.toLocaleDateString("sv-SE");
  return new Date(yyyyMMdd).getTime().toString();
};

interface ResultCalendarDayCellProps {
  date: Date;
  isDisabled: boolean;
  voteStatusMap: VoteStatusMap;
  onClick?: (date: Date) => void;
}

export default function ResultCalendarDayCell({
  date,
  isDisabled,
  voteStatusMap,
  onClick,
}: ResultCalendarDayCellProps) {
  const normalized = normalizeDate(date);
  const voteStatus = voteStatusMap[normalized];
  const available = voteStatus?.available ?? [];

  return (
    <div className="py-1 text-center h-[70px] flex flex-col items-center justify-start">
      <button
        onClick={() => onClick?.(date)}
        disabled={isDisabled}
        className={cn(
          "w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors",
          isDisabled ? "text-gray-400 bg-gray-50 cursor-not-allowed" : "text-gray-800 hover:bg-gray-100"
        )}
      >
        {date.getDate()}
      </button>

      {available.length > 0 && (
        <div className="mt-[2px] h-[20px] w-[40px] flex flex-col items-center gap-[2px]">
          {[0, 1].map((line) => {
            const lineUsers = available.slice(line * 4, line * 4 + 4);
            if (lineUsers.length === 0) return null;

            const totalWidth = 16 + (lineUsers.length - 1) * 12; // 4px 겹침 고려
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
  );
}
