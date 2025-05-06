import { Button } from "@/shared/components/ui/button";
import ResultCalendar from "@/features/calendar/ui/result-calendar";
import { useLimitedMonthRange, useSelectableDateRange } from "@/features/calendar/hooks";
import { getPeriodDisplay } from "@/features/calendar/utils";
import { useFetchVoteStatus } from "../../hooks";
import { useEffect, useState } from "react";

interface PromiseResultProps {
  period?: number;
  timeRange?: string;
  onRestart: () => void;
  onShare: () => void;
}

export default function PromiseResult({ period = 7, timeRange = "저녁", onRestart, onShare }: PromiseResultProps) {
  const { voteStatusMap, fetchVoteStatus } = useFetchVoteStatus();
  const { startDate, endDate, startTimestamp, endTimestamp } = useSelectableDateRange(period);
  const { currentMonth, goToMonth } = useLimitedMonthRange(startDate, endDate);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchVoteStatus();
      setIsLoading(false);
    };
    load();
  }, [fetchVoteStatus]);

  if (isLoading || !voteStatusMap) {
    return <div className="text-center mt-10">불러오는 중...</div>;
  }

  const periodDisplay = getPeriodDisplay(startDate, endDate, timeRange);

  return (
    <div className="flex flex-col w-full max-w-lg gap-10 pb-32">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-xl font-bold leading-snug text-primary">되는 날을 확인하세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">투표된 날짜가 달력에 표시돼요</p>
        <p className="mt-2 text-sm bg-primary/80 text-primary-foreground inline-block px-2 py-1 rounded-md">
          {periodDisplay}
        </p>
      </div>

      <ResultCalendar
        currentMonth={currentMonth}
        onMonthChange={goToMonth}
        voteStatusMap={voteStatusMap}
        limitStart={startTimestamp}
        limitEnd={endTimestamp}
        onDateClick={(date) => {
          console.log("날짜 클릭됨:", date);
        }}
      />

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-1/2 text-muted border-none" variant="link" onClick={() => onRestart()}>
            다시 투표하기
          </Button>
          <Button className="w-1/2 text-primary-foreground" onClick={() => onShare()}>
            공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}
