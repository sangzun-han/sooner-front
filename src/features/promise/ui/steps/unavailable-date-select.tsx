import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/features/calendar/ui";

interface Props {
  selectedDates: number[];
  availableDates: number[];
  period: number;
  timeRange: string;
  onNext: (dates: number[]) => void;
  onBack: () => void;
}

export default function UnavailableDateSelect({
  selectedDates,
  availableDates,
  onNext,
  onBack,
  period,
  timeRange,
}: Props) {
  const [dates, setDates] = useState<number[]>(selectedDates);

  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + period - 1);

  const limitStart = today.setHours(0, 0, 0, 0);
  const limitEnd = endDate.getTime();

  const currentMonthStart = new Date(today.getFullYear(), today.getMonth());
  const [currentMonth, setCurrentMonth] = useState(currentMonthStart);

  const toggleDate = (date: Date) => {
    const timestamp = date.getTime();

    if (timestamp > limitEnd || timestamp < limitStart || availableDates.includes(timestamp)) {
      return;
    }

    setDates((prev) => (prev.includes(timestamp) ? prev.filter((d) => d !== timestamp) : [...prev, timestamp]));
  };

  const formatDisplayDate = (date: Date) => {
    const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}/${date.getDate()}(${weekdayNames[date.getDay()]})`;
  };

  const timeEmojiMap: Record<string, string> = {
    아침: "🌤️",
    낮: "☀️",
    저녁: "🌙",
  };

  const periodDisplay = `${formatDisplayDate(new Date(limitStart))} - ${formatDisplayDate(
    endDate
  )} ${timeRange} 시간대 ${timeEmojiMap[timeRange] ?? ""}`;

  const handleMonthChange = (newMonth: Date) => {
    const maxMonth = new Date(endDate.getFullYear(), endDate.getMonth());
    const minMonth = new Date(today.getFullYear(), today.getMonth());

    if (newMonth >= minMonth && newMonth <= maxMonth) {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg gap-10">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-xl font-bold leading-snug text-primary">불가능한 날짜를 골라주세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">참여할 수 없는 날짜를 제외해 주세요</p>
        <p className="mt-2 text-sm bg-primary/80 text-primary-foreground inline-block px-2 py-1 rounded-md">
          {periodDisplay}
        </p>
      </div>

      <Calendar
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
        selectedDates={dates}
        onDateToggle={toggleDate}
        limitStart={limitStart}
        limitEnd={limitEnd}
        disabledDates={availableDates}
      />

      <section className="pt-4 border-t border-gray-200">
        <h2 className="text-sm font-medium mb-2">내가 제외한 날짜</h2>
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto text-sm">
          {dates
            .map((t) => new Date(t))
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date, index) => (
              <span key={index} className="px-3 py-1 rounded-full text-sm bg-destructive text-white">
                {formatDisplayDate(date)}
              </span>
            ))}
        </div>
      </section>

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-1/2 text-muted border-none" variant="link" onClick={onBack}>
            이전
          </Button>
          <Button className="w-1/2 text-primary-foreground" onClick={() => onNext(dates)} disabled={dates.length === 0}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
