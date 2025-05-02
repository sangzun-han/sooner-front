import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/features/calendar/ui/calendar";

interface Props {
  selectedDates: number[];
  onNext: (dates: number[]) => void;
  onBack: () => void;
}

export default function AvailableDateSelect({ selectedDates, onNext, onBack }: Props) {
  const [dates, setDates] = useState<number[]>(selectedDates);

  const currentMonth = new Date(2025, 2);
  const limitDate = new Date(2025, 2, 20).getTime();

  const toggleDate = (date: Date) => {
    const timestamp = date.getTime();
    if (timestamp > limitDate) return;

    setDates((prev) => (prev.includes(timestamp) ? prev.filter((d) => d !== timestamp) : [...prev, timestamp]));
  };

  const formatDate = (date: Date) => {
    const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}/${date.getDate()}(${weekdayNames[date.getDay()]})`;
  };

  return (
    <div className="flex flex-col w-full max-w-lg gap-10">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-xl font-bold leading-snug text-primary">가능한 날짜를 골라주세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">최대한 많은 날짜를 선택해 주세요</p>
        <p className="mt-2 text-sm bg-primary text-primary-foreground inline-block px-2 py-1 rounded-md">
          3/6(목) - 3/20(목) 저녁 시간대 🌙
        </p>
      </div>

      <Calendar
        currentMonth={currentMonth}
        onMonthChange={() => {}}
        selectedDates={dates}
        onDateToggle={toggleDate}
        limitDate={limitDate}
      />

      <section className="pt-4 border-t border-gray-200">
        <h2 className="text-sm font-medium mb-2">내가 선택한 날짜</h2>
        <div className="flex items-start text-sm">
          <Check className="w-6 h-6 text-green-400 mt-1 mr-1" />
          <p className="flex-1 break-words leading-relaxed">
            {dates
              .map((t) => new Date(t))
              .sort((a, b) => a.getTime() - b.getTime())
              .map(formatDate)
              .join(" ")}
          </p>
        </div>
      </section>

      <div className="fixed bottom-0 z-10 inset-x-0 mx-auto max-w-lg w-full bg-background p-4 flex justify-between">
        <Button className="w-[48%]" variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button
          className="w-[48%] bg-primary text-primary-foreground"
          onClick={() => onNext(dates)}
          disabled={dates.length === 0}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
