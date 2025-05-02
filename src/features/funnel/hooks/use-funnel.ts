import { useState, useRef, useCallback } from "react";
import type { StepName, FunnelContext } from "../model/types";

interface FunnelState {
  step: StepName;
  context: FunnelContext;
}

export const useFunnel = (initialStep: StepName = "계획") => {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [history, setHistory] = useState<FunnelState[]>([
    {
      step: initialStep,
      context: {},
    },
  ]);

  // 이전 단계를 추적하기 위한 ref
  const prevStepRef = useRef<StepName | null>(null);

  const current = history[history.length - 1];

  const push = useCallback(
    (nextStep: StepName, updatedContext: Partial<FunnelContext> = {}) => {
      setDirection("forward");
      prevStepRef.current = current.step;
      const merged = { ...current.context, ...updatedContext };
      setHistory((prev) => [...prev, { step: nextStep, context: merged }]);
    },
    [current]
  );

  const back = useCallback(() => {
    if (history.length > 1) {
      setDirection("backward");
      prevStepRef.current = current.step;
      setHistory((prev) => prev.slice(0, -1));
    }
  }, [history.length, current.step]);

  return {
    step: current.step,
    context: current.context,
    prevStep: prevStepRef.current,
    push,
    back,
    history,
    direction,
  };
};
