import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { PERIOD_OPTIONS } from "@/shared/constants";
import { CalendarConfig } from "@/entities/promise/model";
import { useMonthNavigation, useSelectableDateRange } from "@/entities/promise/hooks/";
import { Calendar } from "@/entities/promise/ui/calendar";
import { formatDateWithDay, formatPeriodDisplay } from "@/entities/promise/utils";
import { PromiseHeader } from "@/entities/promise/ui/common";

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
  const { currentMonth, goToMonth, resetToInitialMonth } = useMonthNavigation(startDate, endDate);
  const periodDisplay = formatPeriodDisplay(startDate, endDate, timeRange);

  const calendarConfig: CalendarConfig = {
    mode: "available",
    value: availableDates,
    onChange: (next) => updateContext({ availableDates: next }),
    range: { start: startTimestamp, end: endTimestamp },
  };

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
        title="가능한 날짜를 골라주세요"
        description="참여할 수 있는 날짜를 선택해 주세요"
        subtitle={periodDisplay}
      />

      <Calendar month={currentMonth} setMonth={goToMonth} config={calendarConfig} />

      <section className="pt-4 border-t border-accent w-full max-w-lg">
        <h2 className="text-sm font-medium mb-2">내가 선택한 날짜</h2>
        <div className="flex flex-wrap gap-2 justify-start text-sm">
          {availableDates
            .map((t) => new Date(t))
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date, index) => (
              <span key={index} className="px-3 py-1.5 rounded-full text-sm bg-accent text-left">
                {formatDateWithDay(date)}
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
