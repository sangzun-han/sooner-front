import { useState } from "react";
import { Check, Search } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CalendarSelector } from "@/features/calendar/ui/calnedar-selector";

export default function PromiseCreate2Page() {
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2)); // March 2025
  const [selectedDates, setSelectedDates] = useState([
    new Date(2025, 2, 6).getTime(),
    new Date(2025, 2, 10).getTime(),
    new Date(2025, 2, 11).getTime(),
    new Date(2025, 2, 13).getTime(),
    new Date(2025, 2, 17).getTime(),
    new Date(2025, 2, 18).getTime(),
    new Date(2025, 2, 20).getTime(),
  ]);

  const limitDate = new Date(2025, 2, 20).getTime(); // March 20, 2025

  const toggleDate = (date: Date) => {
    const timestamp = date.getTime();
    const isAfterLimit = timestamp > limitDate;
    if (isAfterLimit) return;

    setSelectedDates((prev) => (prev.includes(timestamp) ? prev.filter((d) => d !== timestamp) : [...prev, timestamp]));
  };

  const formatDate = (date: Date) => {
    const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}/${date.getDate()}(${weekdayNames[date.getDay()]})`;
  };

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-lg flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <Link target="_self" to="/" className="flex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" width={52} height={52} alt="sonner-icon" className="object-cover" />
            </Link>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            약속잡기
          </div>
          <div className="absolute bottom-0 right-3 top-0 flex flex-row items-center justify-center">
            <Button type="button" className="relative flex w-10 h-10 items-center justify-center p-2" variant="ghost">
              <span className="sr-only">Search</span>
              <Search className="w-6 h-6 text-black" />
            </Button>
          </div>
        </div>
      </header>
      <div
        id="main-content"
        className="flex w-full max-w-lg flex-1 flex-col items-start justify-start pt-6 text-left relative"
      >
        <div className="flex flex-col w-full gap-10 px-6 pb-32">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-xl font-bold leading-snug text-primary">되는 날을</h1>
            <p className="text-xl font-bold">캘린더에서 모두 골라주세요</p>
            <p className="mt-2 text-sm bg-primary text-primary-foreground px-2 py-1 rounded-md">
              3/6(목) - 3/20(목) 저녁 시간대 🌙
            </p>
          </div>
          <CalendarSelector
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDates={selectedDates}
            onDateToggle={toggleDate}
            limitDate={limitDate}
          />
          <div className="mt-6 pt-4 border-t border-gray-200 w-full">
            <p className="text-sm font-medium mb-2">내가 선택한 날짜</p>
            <div className="flex items-start text-sm">
              <div className="mt-1 mr-1">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <p className="flex-1 break-words leading-relaxed">
                {selectedDates
                  .map((timestamp) => new Date(timestamp))
                  .sort((a, b) => a.getTime() - b.getTime())
                  .map(formatDate)
                  .join(" ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 w-full bg-background p-4 flex justify-center max-w-lg">
        <Button
          className="w-full bg-primary text-primary-foreground"
          onClick={() => {
            navigate(`/promise/create`);
          }}
        >
          약속 만들기
        </Button>
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100"></div>
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-lg"></div>
      </div>
    </div>
  );
}
