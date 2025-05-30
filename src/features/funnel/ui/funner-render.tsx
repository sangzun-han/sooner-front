import type { ReactNode } from "react";
import { FunnelStepContextMap } from "../model/types";

type FunnelProps<T extends FunnelStepContextMap> = {
  [K in keyof T]: (props: {
    context: T[K];
    history: {
      push: <S extends keyof T>(step: S, context: T[S]) => void;
      back: () => void;
    };
    updateContext: (partial: Partial<T[K]>) => void;
  }) => ReactNode;
};

export default function CreateFunnelRender<T extends FunnelStepContextMap>(config: {
  step: keyof T;
  context: T[keyof T];
  push: <K extends keyof T>(step: K, context: T[K]) => void;
  back: () => void;
  updateContext: <K extends keyof T>(partial: Partial<T[K]>) => void;
}) {
  return function Render(props: FunnelProps<T>) {
    const Component = props[config.step];
    if (!Component) return null;

    return Component({
      context: config.context,
      updateContext: config.updateContext,
      history: {
        push: config.push,
        back: config.back,
      },
    });
  };
}
