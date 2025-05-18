import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { PERIOD_OPTIONS } from "@/shared/constants";
import { useMonthNavigation, useSelectableDateRange } from "@/entities/promise/hooks/";
import { formatDateWithDay, formatPeriodDisplay } from "@/entities/promise/utils";
import { Calendar } from "../calendar";
import { PromiseHeader } from "@/entities/promise/ui/common";
import { CalendarConfig } from "@/entities/promise/model";

interface UnavailableDateSelectProps {
  defaultValues: {
    period?: string;
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
  const { availableDates = [], unavailableDates = [], period = "ONE_WEEK", timeRange = "MORNING" } = defaultValues;

  const periodInDays = useMemo(() => {
    const option = PERIOD_OPTIONS.find((opt) => opt.key === period);
    return option ? option.days : 7;
  }, [period]);

  const { startDate, endDate, startTimestamp, endTimestamp } = useSelectableDateRange(periodInDays);
  const { currentMonth, goToMonth, resetToInitialMonth } = useMonthNavigation(startDate, endDate);

  const calendarConfig: CalendarConfig = {
    mode: "unavailable",
    value: unavailableDates,
    onChange: (next) => {
      const filteredDates = next.filter((timestamp) => {
        return !availableDates.includes(timestamp) && timestamp >= startTimestamp && timestamp <= endTimestamp;
      });
      updateContext({ unavailableDates: filteredDates });
    },
    range: { start: startTimestamp, end: endTimestamp },
    disabled: availableDates,
  };

  const periodDisplay = formatPeriodDisplay(startDate, endDate, timeRange);

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
      <PromiseHeader
        title="불가능한 날짜를 골라주세요"
        description="참여할 수 없는 날짜를 제외해 주세요"
        subtitle={periodDisplay}
      />

      <Calendar month={currentMonth} setMonth={goToMonth} config={calendarConfig} />

      <section className="pt-4 border-t border-gray-200">
        {unavailableDates.length === 0 && (
          <p className="mb-2 text-xs text-muted-foreground">제외할 날짜가 없다면 넘어가주세요</p>
        )}
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2">가능한 날짜</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {availableDates
              .map((t) => new Date(t))
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <span
                  key={`available-${index}`}
                  className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground border border-border"
                >
                  {formatDateWithDay(date)}
                </span>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 text-destructive">불가능한 날짜</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {unavailableDates
              .map((t) => new Date(t))
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <span
                  key={`unavailable-${index}`}
                  className="px-3 py-1 rounded-full text-sm bg-destructive/70 text-white"
                >
                  {formatDateWithDay(date)}
                </span>
              ))}
          </div>
        </div>
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
