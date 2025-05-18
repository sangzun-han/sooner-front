import { CalendarConfig } from "../../model/calendar-context";
import { CalendarProvider } from "../../model/calendar-provider";
import CalendarHeader from "./calendar-header";
import CalendarMonthGrid from "./calendar-month-grid";
import CalendarWeekDays from "./calendar-weekdays";

interface CalendarProps {
  month: Date;
  setMonth: (d: Date) => void;
  config: CalendarConfig;
}

export default function Calendar({ month, setMonth, config }: CalendarProps) {
  return (
    <CalendarProvider value={config}>
      <div className="w-full select-none">
        <CalendarHeader month={month} setMonth={setMonth} />
        <CalendarWeekDays />
        <CalendarMonthGrid month={month} />
      </div>
    </CalendarProvider>
  );
}
