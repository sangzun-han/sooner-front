import { useFunnel } from "@/features/funnel/hooks";
import { PromiseLayout } from "@/features/promise/ui/layout";
import { AvailableDateSelect, PlanSetting, PromiseInit, UnavailableDateSelect } from "@/features/promise/ui/steps";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

type Direction = "forward" | "backward";

export default function PromisePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const funnel = useFunnel<{
    약속만들기: Record<string, never>;
    계획: { period?: number; timeRange?: string; deadline?: string };
    가능한날짜: { period?: number; timeRange?: string; deadline?: string; availableDates: number[] };
    불가능한날짜: {
      period?: number;
      timeRange?: string;
      deadline?: string;
      availableDates: number[];
      unavailableDates: number[];
    };
  }>({
    id: "@promise-funnel",
    initial: {
      step: "약속만들기",
      context: {},
    },
  });

  const slideVariants: Variants = {
    enter: (direction: Direction) => ({
      x: direction === "forward" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: Direction) => ({
      x: direction === "forward" ? -300 : 300,
      opacity: 0,
    }),
  };

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [funnel.step]);

  return (
    <PromiseLayout>
      <AnimatePresence custom={funnel.direction} mode="wait">
        <motion.div
          ref={scrollRef}
          key={funnel.step}
          custom={funnel.direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.2,
          }}
          className="absolute inset-0 overflow-y-auto px-4 pb-24"
        >
          <funnel.Render
            약속만들기={({ history }) => <PromiseInit onNext={() => history.push("계획", {})} />}
            계획={({ context, history }) => (
              <PlanSetting
                defaultValues={context}
                onNext={({ period, timeRange, deadline }) =>
                  history.push("가능한날짜", {
                    period,
                    timeRange,
                    deadline,
                    availableDates: [],
                  })
                }
              />
            )}
            가능한날짜={({ context, history }) => (
              <AvailableDateSelect
                selectedDates={context.availableDates ?? []}
                period={context.period ?? 7}
                timeRange={context.timeRange ?? "저녁"}
                onNext={(availableDates) =>
                  history.push("불가능한날짜", {
                    ...context,
                    availableDates,
                    unavailableDates: [],
                  })
                }
                onBack={history.back}
              />
            )}
            불가능한날짜={({ context, history }) => (
              <UnavailableDateSelect
                selectedDates={context.unavailableDates ?? []}
                period={context.period!}
                timeRange={context.timeRange!}
                availableDates={context.availableDates ?? []}
                onNext={(unavailableDates) =>
                  history.push("결과", {
                    ...context,
                    unavailableDates,
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
