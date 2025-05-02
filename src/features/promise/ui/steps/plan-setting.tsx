import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  defaultValues: {
    기간?: number;
    시간대?: string;
    마감시간?: string;
  };
  onNext: (context: Props["defaultValues"]) => void;
}

export default function PlanSetting({ defaultValues, onNext }: Props) {
  const [period, setPeriod] = useState<number | undefined>(defaultValues.기간);
  const [timeRange, setTimeRange] = useState<string | undefined>(defaultValues.시간대);
  const [deadline, setDeadline] = useState<string | undefined>(defaultValues.마감시간);

  const handleNext = () => {
    if (period && timeRange && deadline) {
      onNext({
        기간: period,
        시간대: timeRange,
        마감시간: deadline,
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div>
        <h1 className="text-xl font-bold leading-snug">
          사람들과 약속잡을
          <br />
          대략적인 정보를 알려주세요
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">최대 12명까지 참여할 수 있어요</p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">약속잡을 기간</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[7, 14, 30, 60].map((d) => (
            <Button
              key={d}
              variant={period === d ? "default" : "outline"}
              className="w-full"
              onClick={() => setPeriod(d)}
            >
              {d === 7 ? "7일 안에" : d === 14 ? "14일 안에" : d === 30 ? "1달 안에" : "2달 안에"}
            </Button>
          ))}
        </div>
      </section>

      {/* 시간대 선택 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">만나는 시간대</h2>
        <div className="grid grid-cols-3 gap-4 place-items-center">
          {[
            { label: "아침", emoji: "🌤️" },
            { label: "낮", emoji: "☀️" },
            { label: "저녁", emoji: "🌙" },
          ].map(({ label, emoji }) => (
            <Button
              key={label}
              variant={timeRange === label ? "default" : "ghost"}
              className="flex flex-col items-center justify-center gap-1 rounded-full w-20 h-20 md:w-24 md:h-24"
              onClick={() => setTimeRange(label)}
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">투표 마감 시간</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["6시간 안에", "오늘 안에", "내일 안에", "모레 안에"].map((text) => (
            <Button
              key={text}
              variant={deadline === text ? "default" : "outline"}
              className="w-full"
              onClick={() => setDeadline(text)}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 z-10 inset-x-0 mx-auto max-w-lg w-full bg-background p-4 flex justify-between">
        <Button
          className="w-full bg-primary text-primary-foreground"
          onClick={handleNext}
          disabled={!period || !timeRange || !deadline}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
