import { useEffect, useState, useCallback, useRef } from "react";
import { FunnelState, FunnelStepContextMap } from "../model/types";
import { createFunnelRender } from "../ui/funner-render";

/**
 * 퍼널 기반의 UI 흐름을 제어하는 커스텀 훅
 *
 * 브라우저의 history API를 활용해 상태 기반 퍼널 전환을 지원하며,
 * 뒤로가기/앞으로가기 네이티브 이벤트와도 동기화됩니다.
 *
 * @template T 단계별 context 타입 맵 (예: { step1: Step1Context, step2: Step2Context })
 * @param config.id 퍼널 고유 ID (history state 식별용)
 * @param config.initial 초기 단계 및 context
 * @returns 퍼널 제어 및 렌더링 관련 객체
 */

export function useFunnel<T extends FunnelStepContextMap>(config: { id: string; initial: FunnelState<T> }) {
  const [history, setHistory] = useState<FunnelState<T>[]>([config.initial]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const isInitialMount = useRef(true);

  /**
   * 다음 단계로 이동
   *
   * @param step 다음 단계의 키
   * @param context 다음 단계에서 사용할 context
   */
  const push = useCallback(
    <K extends keyof T>(step: K, context: T[K]) => {
      const newIndex = index + 1;
      const newState = [...history.slice(0, index + 1), { step, context }];
      setHistory(newState);
      setIndex(newIndex);
      setDirection("forward");
      window.history.pushState({ __funnel__: config.id, index: newIndex }, "");
    },
    [index, history, config.id]
  );

  /**
   * 이전 단계로 이동 (브라우저 history.back)
   */
  const back = useCallback(() => {
    if (index <= 0) return;
    setDirection("backward");
    window.history.back();
  }, [index]);

  /** 이후 단계로 이동 (브라우저 history.forward) */
  const forward = useCallback(() => {
    if (index >= history.length - 1) return;
    setDirection("forward");
    window.history.forward();
  }, [index, history.length]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      window.history.replaceState({ __funnel__: config.id, index: 0 }, "");
    }

    const onPopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state || state.__funnel__ !== config.id || typeof state.index !== "number") return;

      const newDirection = state.index > index ? "forward" : "backward";
      setIndex(state.index);
      setDirection(newDirection);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [config.id, index]);

  const current = history[index];

  const Render = createFunnelRender<T>({
    step: current.step,
    context: current.context,
    push,
    back,
  });

  return {
    step: current.step,
    context: current.context,
    direction,
    history: { push, back, forward },
    Render,
  };
}
