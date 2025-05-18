import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  month: Date;
  setMonth: (m: Date) => void;
}

export default function CalendarHeader({ month, setMonth }: CalendarHeaderProps) {
  const prevMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
  const nextMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1));

  return (
    <div className="mb-2 flex w-full items-center justify-between">
      <button onClick={prevMonth}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h3 className="text-base font-medium">
        {month.getFullYear()}년 {month.getMonth() + 1}월
      </h3>
      <button onClick={nextMonth}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
