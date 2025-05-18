import { useParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { formatPeriodDisplay } from "@/entities/promise/utils";
import { usePromiseDetail } from "@/entities/promise/api";
import { useSelectableDateRange } from "@/entities/promise/hooks";
import { PERIOD_OPTIONS } from "@/shared/constants";
import { ResultCalendar } from "@/entities/promise/ui/calendar";

export default function PromiseDetailPage() {
  const { id } = useParams();
  const { data } = usePromiseDetail(Number(id));

  const periodInDays = PERIOD_OPTIONS.find((opt) => opt.key === data.period)?.days ?? 7;
  const { startDate, endDate } = useSelectableDateRange(periodInDays);

  const periodDisplay = formatPeriodDisplay(startDate, endDate, data.timeRange);

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
        voteStatusMap={data.voteStatusMap}
        availableDates={data.availableDates}
        unavailableDates={data.unavailableDates}
        startDate={startDate}
        endDate={endDate}
      />

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-1/2 text-muted border-none" variant="link" onClick={() => window.location.reload()}>
            다시 투표하기
          </Button>
          <Button className="w-1/2 text-primary-foreground" onClick={() => console.log("공유하기")}>
            공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}
