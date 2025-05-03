export type FunnelStepContextMap = {
  [step: string]: object;
};

export type FunnelState<T extends FunnelStepContextMap> = {
  step: keyof T;
  context: T[keyof T];
};
