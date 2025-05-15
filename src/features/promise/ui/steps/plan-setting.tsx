import { Button } from "@/shared/components/ui/button";
import { DEADLINE_OPTIONS, PERIOD_OPTIONS, TIME_RANGE_OPTIONS } from "@/shared/constants";

interface PlanSettingProps {
  defaultValues: {
    period?: string;
    timeRange?: string;
    deadline?: string;
  };
  updateContext: (partial: { period?: string; timeRange?: string; deadline?: string }) => void;
  onNext: () => void;
}

export default function PlanSetting({ defaultValues, updateContext, onNext }: PlanSettingProps) {
  const { period, timeRange, deadline } = defaultValues;

  const handleNext = () => {
    if (period && timeRange && deadline) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div>
        <h1 className="text-xl font-bold leading-snug">사람들과 약속잡을</h1>
        <h1 className="text-xl font-bold leading-snug">대략적인 정보를 알려주세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">최대 12명까지 참여할 수 있어요</p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">약속잡을 기간</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PERIOD_OPTIONS.map(({ key, value }) => (
            <Button
              key={key}
              variant={period === key ? "default" : "outline"}
              className="w-full"
              onClick={() => updateContext({ period: key })}
            >
              {value}
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">만나는 시간대</h2>
        <div className="grid grid-cols-3 gap-4 place-items-center">
          {TIME_RANGE_OPTIONS.map(({ key, value, emoji }) => (
            <Button
              key={key}
              variant={timeRange === key ? "default" : "ghost"}
              className="flex flex-col items-center justify-center gap-1 rounded-full w-20 h-20 md:w-24 md:h-24"
              onClick={() => updateContext({ timeRange: key })}
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-sm">{value}</span>
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">투표 마감 시간</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DEADLINE_OPTIONS.map(({ key, value }) => (
            <Button
              key={key}
              variant={deadline === key ? "default" : "outline"}
              className="w-full"
              onClick={() => updateContext({ deadline: key })}
            >
              {value}
            </Button>
          ))}
        </div>
      </section>

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={handleNext}
            disabled={!period || !timeRange || !deadline}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
