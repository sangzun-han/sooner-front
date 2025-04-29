import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface CalendarSelectorProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
  selectedDates: number[];
  onDateToggle: (date: Date) => void;
  limitDate?: number;
}

export function CalendarSelector({
  currentMonth,
  onMonthChange,
  selectedDates,
  onDateToggle,
  limitDate,
}: CalendarSelectorProps) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const isSelected = (date: Date) => {
    return selectedDates.includes(date.getTime());
  };

  const isDisabled = (date: Date) => {
    return limitDate !== undefined && date.getTime() > limitDate;
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = Array(firstDay.getDay()).fill(null);
    const daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => new Date(year, month, i + 1));
    return [...startPadding, ...daysInMonth];
  };

  const days = getDaysInMonth();

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div className="w-full">
      {/* 월 이동 버튼 */}
      <div className="flex justify-between items-center w-full mb-2">
        <button onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-base font-medium">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </h3>
        <button onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((day, i) => (
          <div key={day} className={`text-center text-xs font-medium py-2 ${i === 0 ? "text-red-500" : ""}`}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 렌더링 */}
      <div className="border-t border-gray-200">
        {rows.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day, dayIndex) => (
              <div key={dayIndex} className="py-2 text-center">
                {day && (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onDateToggle(day)}
                      disabled={isDisabled(day)}
                      className="w-full flex justify-center"
                    >
                      <div
                        className={cn(
                          "w-6 h-6 border rounded-sm flex items-center justify-center",
                          isSelected(day)
                            ? "bg-neutral-800 text-white border-neutral-800"
                            : "border-gray-300 text-gray-800",
                          isDisabled(day) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isSelected(day) && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                    <span className="text-xs mt-1">{day.getDate()}일</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
