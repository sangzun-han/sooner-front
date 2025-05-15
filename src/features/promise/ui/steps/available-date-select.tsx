import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/features/calendar/ui";
import { useLimitedMonthRange, useSelectableDateRange } from "@/features/calendar/hooks";
import { formatDisplayDate, getPeriodDisplay, getUpdatedSelectedDates } from "@/features/calendar/utils";
import { useMemo } from "react";
import { PERIOD_OPTIONS } from "@/shared/constants";

interface AvailableDateSelectProps {
  defaultValues: {
    period?: string;
    timeRange?: string;
    deadline?: string;
    availableDates?: number[];
  };
  updateContext: (partial: { availableDates: number[] }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AvailableDateSelect({
  defaultValues,
  updateContext,
  onNext,
  onBack,
}: AvailableDateSelectProps) {
  const { period = "ONE_WEEK", timeRange = "MORNING", availableDates = [] } = defaultValues;

  const periodInDays = useMemo(() => {
    const option = PERIOD_OPTIONS.find((opt) => opt.key === period);
    return option ? option.days : 7;
  }, [period]);

  const { startDate, endDate, startTimestamp, endTimestamp } = useSelectableDateRange(periodInDays);
  const { currentMonth, goToMonth, resetToInitialMonth } = useLimitedMonthRange(startDate, endDate);

  const toggleDate = (date: Date) => {
    const next = getUpdatedSelectedDates(availableDates, date);
    updateContext({ availableDates: next });
  };

  const periodDisplay = getPeriodDisplay(startDate, endDate, timeRange);

  const handleNext = () => {
    resetToInitialMonth();
    onNext();
  };

  const handleBack = () => {
    resetToInitialMonth();
    onBack();
  };

  return (
    <div className="flex flex-col w-full max-w-lg gap-10">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-xl font-bold leading-snug text-primary">가능한 날짜를 골라주세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">참여할 수 있는 날짜를 선택해 주세요</p>
        <p className="mt-2 text-sm bg-primary/80 text-primary-foreground inline-block px-2 py-1 rounded-md">
          {periodDisplay}
        </p>
      </div>

      <Calendar
        currentMonth={currentMonth}
        onMonthChange={goToMonth}
        selectedDates={availableDates}
        onDateToggle={toggleDate}
        limitStart={startTimestamp}
        limitEnd={endTimestamp}
      />

      <section className="pt-4 border-t border-gray-200">
        <h2 className="text-sm font-medium mb-2">내가 선택한 날짜</h2>
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto text-sm">
          {availableDates
            .map((t) => new Date(t))
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date, index) => (
              <span key={index} className="px-3 py-1 rounded-full text-sm bg-accent">
                {formatDisplayDate(date)}
              </span>
            ))}
        </div>

        {availableDates.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">선택하지 않으면 전체 기간이 가능한 날짜로 간주돼요.</p>
        )}
      </section>

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-1/2 text-muted border-none" variant="link" onClick={handleBack}>
            이전
          </Button>
          <Button className="w-1/2 text-primary-foreground" onClick={handleNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
