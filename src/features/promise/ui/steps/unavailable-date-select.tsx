import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/features/calendar/ui";
import { useLimitedMonthRange, useSelectableDateRange } from "@/features/calendar/hooks";
import { formatDisplayDate, getPeriodDisplay, getUpdatedSelectedDates } from "@/features/calendar/utils";

interface UnavailableDateSelectProps {
  defaultValues: {
    period?: number;
    timeRange?: string;
    deadline?: string;
    availableDates?: number[];
    unavailableDates?: number[];
  };
  updateContext: (partial: { unavailableDates: number[] }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function UnavailableDateSelect({
  defaultValues,
  updateContext,
  onNext,
  onBack,
}: UnavailableDateSelectProps) {
  const { availableDates = [], unavailableDates = [], period = 7, timeRange = "저녁" } = defaultValues;

  const { startDate, endDate, startTimestamp, endTimestamp } = useSelectableDateRange(period);
  const { currentMonth, goToMonth } = useLimitedMonthRange(startDate, endDate);

  const toggleDate = (date: Date) => {
    const timestamp = date.getTime();
    const isOutOfRange = timestamp < startTimestamp || timestamp > endTimestamp;
    const isAvailable = availableDates.includes(timestamp);
    if (isOutOfRange || isAvailable) return;

    const next = getUpdatedSelectedDates(unavailableDates, date);
    updateContext({ unavailableDates: next });
  };

  const periodDisplay = getPeriodDisplay(startDate, endDate, timeRange);

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
        onMonthChange={goToMonth}
        selectedDates={unavailableDates}
        onDateToggle={toggleDate}
        limitStart={startTimestamp}
        limitEnd={endTimestamp}
        disabledDates={availableDates}
      />
      <section className="pt-4 border-t border-gray-200">
        {unavailableDates.length === 0 && (
          <p className="mb-2 text-xs text-muted-foreground">제외할 날짜가 없다면 넘어가주세요</p>
        )}
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2">가능한 날짜</h2>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto text-sm">
            {availableDates
              .map((t) => new Date(t))
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <span
                  key={`available-${index}`}
                  className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground border border-border"
                >
                  {formatDisplayDate(date)}
                </span>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 text-destructive">불가능한 날짜</h2>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto text-sm">
            {unavailableDates
              .map((t) => new Date(t))
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <span
                  key={`unavailable-${index}`}
                  className="px-3 py-1 rounded-full text-sm bg-destructive/70 text-white"
                >
                  {formatDisplayDate(date)}
                </span>
              ))}
          </div>
        </div>
      </section>

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-1/2 text-muted border-none" variant="link" onClick={onBack}>
            이전
          </Button>
          <Button className="w-1/2 text-primary-foreground" onClick={onNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
