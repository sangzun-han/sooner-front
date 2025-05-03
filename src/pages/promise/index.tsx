import { useFunnel } from "@/features/funnel/hooks";
import { PromiseLayout } from "@/features/promise/ui/layout";
import { AvailableDateSelect, PlanSetting, PromiseInit } from "@/features/promise/ui/steps";

export default function PromisePage() {
  const funnel = useFunnel<{
    약속만들기: Record<string, never>;
    계획: {
      period?: number;
      timeRange?: string;
      deadline?: string;
    };
    가능한날짜: {
      period?: number;
      timeRange?: string;
      deadline?: string;
      availableDates: number[];
    };
  }>({
    id: "@promise-funnel",
    initial: {
      step: "약속만들기",
      context: {},
    },
  });

  return (
    <PromiseLayout>
      <funnel.Render
        약속만들기={({ history }) => <PromiseInit onNext={() => history.push("계획", {})} />}
        계획={({ context, history }) => (
          <PlanSetting
            defaultValues={context}
            onNext={(nextContext) =>
              history.push("가능한날짜", {
                ...nextContext,
                availableDates: [],
              })
            }
          />
        )}
        가능한날짜={({ context, history }) => (
          <AvailableDateSelect
            selectedDates={context.availableDates ?? []}
            onNext={(availableDates) =>
              history.push("불가능날짜", {
                ...context,
                availableDates,
                unavailableDates: [],
              })
            }
            onBack={history.back}
          />
        )}
      />
    </PromiseLayout>
  );
}
