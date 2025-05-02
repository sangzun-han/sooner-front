import { ReactNode } from "react";
import { FunnelContext } from "../lib/context";
import { StepName } from "../model/types";

interface FunnelProviderProps {
  currentStep: StepName;
  prevStep: StepName | null;
  direction: "forward" | "backward";
  children: ReactNode;
}

export default function FunnelProvider({ children, currentStep, prevStep, direction }: FunnelProviderProps) {
  return <FunnelContext.Provider value={{ currentStep, direction, prevStep }}>{children}</FunnelContext.Provider>;
}
