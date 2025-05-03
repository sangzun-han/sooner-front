import type { ReactNode } from "react";
import { FunnelStepContextMap } from "../model/types";

type FunnelProps<T extends FunnelStepContextMap> = {
  [K in keyof T]: (props: {
    context: T[K];
    history: {
      push: <S extends keyof T>(step: S, context: T[S]) => void;
      back: () => void;
    };
  }) => ReactNode;
};

export function createFunnelRender<T extends FunnelStepContextMap>(config: {
  step: keyof T;
  context: T[keyof T];
  push: <K extends keyof T>(step: K, context: T[K]) => void;
  back: () => void;
}) {
  return function Render(props: FunnelProps<T>) {
    const Component = props[config.step];
    if (!Component) return null;

    return Component({
      context: config.context,
      history: {
        push: config.push,
        back: config.back,
      },
    });
  };
}
