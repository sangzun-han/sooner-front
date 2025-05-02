import { createContext } from "react";
import type { StepName } from "../model/types";

export const FunnelContext = createContext<{
  currentStep: StepName;
  prevStep: StepName | null;
  direction: "forward" | "backward";
}>({
  currentStep: "계획",
  prevStep: null,
  direction: "forward",
});
