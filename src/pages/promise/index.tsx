import { useFunnel } from "@/features/funnel/hooks";
import { useLayoutEffect, useRef } from "react";
import { FunnelSlideWrapper } from "@/features/funnel/ui";
import { PromiseLayout } from "@/features/promise/ui/layout";
import {
  AvailableDateSelect,
  PlanSetting,
  PromiseInit,
  UnavailableDateSelect,
  PromiseResult,
} from "@/features/promise/ui/steps";

type PromiseFunnelContext = {
  period?: number;
  timeRange?: string;
  deadline?: string;
  availableDates?: number[];
  unavailableDates?: number[];
};

export default function PromisePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const funnel = useFunnel<{
    약속만들기: PromiseFunnelContext;
    계획: PromiseFunnelContext;
    가능한날짜: PromiseFunnelContext;
    불가능한날짜: PromiseFunnelContext;
    결과: PromiseFunnelContext;
  }>({
    id: "@promise-funnel",
    initial: {
      step: "약속만들기",
      context: {},
    },
  });

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [funnel.step]);

  return (
    <PromiseLayout>
      <FunnelSlideWrapper step={funnel.step} direction={funnel.direction}>
        <funnel.Render
          약속만들기={({ context, history }) => <PromiseInit onNext={() => history.push("계획", context)} />}
          계획={({ context, history }) => (
            <PlanSetting
              defaultValues={context}
              updateContext={funnel.updateContext}
              onNext={() => history.push("가능한날짜", context)}
            />
          )}
          가능한날짜={({ context, history }) => (
            <AvailableDateSelect
              defaultValues={context}
              updateContext={funnel.updateContext}
              onNext={() => history.push("불가능한날짜", context)}
              onBack={history.back}
            />
          )}
          불가능한날짜={({ context, history }) => (
            <UnavailableDateSelect
              defaultValues={context}
              updateContext={funnel.updateContext}
              onNext={() => history.push("결과", context)}
              onBack={history.back}
            />
          )}
          결과={({ context }) => (
            <PromiseResult defaultValues={context} onRestart={() => {}} onShare={() => console.log("공유")} />
          )}
        />
      </FunnelSlideWrapper>
    </PromiseLayout>
  );
}
