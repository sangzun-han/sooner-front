import type { StepName } from "../model/types";

interface FunnelStepProps {
  name: StepName;
  children: React.ReactNode;
}

export default function FunnelStep({ children }: FunnelStepProps) {
  return <>{children}</>;
}
