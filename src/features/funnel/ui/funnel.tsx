import { useContext, useRef, useEffect } from "react";
import { FunnelContext } from "../lib/context";
import type { StepName } from "../model/types";
import { AnimatePresence, motion } from "framer-motion";

interface FunnelProps {
  children: React.ReactElement<{
    name: StepName;
    children: React.ReactNode;
  }>[];
}

export default function Funnel({ children }: FunnelProps) {
  const { currentStep, direction, prevStep } = useContext(FunnelContext);
  const prevStepRef = useRef<StepName | null>(prevStep);

  const activeStep = children.find((child) => child.props.name === currentStep);

  const variants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "tween", duration: 0.2 },
        opacity: { duration: 0.1 },
        scale: { duration: 0.1 },
      },
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "tween", duration: 0.25 },
        opacity: { duration: 0.1 },
        scale: { duration: 0.1 },
      },
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "-0%" : "0%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "tween", duration: 0.2 },
        opacity: { duration: 0.1 },
        scale: { duration: 0.1 },
      },
    }),
  };

  useEffect(() => {
    if (prevStep !== null) {
      prevStepRef.current = prevStep;
    }
  }, [prevStep]);

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          layout
          onAnimationStart={() => window.scrollTo(0, 0)}
        >
          {activeStep?.props.children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
