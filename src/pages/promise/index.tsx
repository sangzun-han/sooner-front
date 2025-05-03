import { useFunnel } from "@/features/funnel/hooks";
import { PromiseLayout } from "@/features/promise/ui/layout";
import { AvailableDateSelect, PlanSetting, PromiseInit } from "@/features/promise/ui/steps";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence mode="wait">
        <motion.div
          key={funnel.step}
          initial={{ x: funnel.direction === "forward" ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: funnel.direction === "forward" ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 px-4"
        >
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
        </motion.div>
      </AnimatePresence>
    </PromiseLayout>
  );
}
