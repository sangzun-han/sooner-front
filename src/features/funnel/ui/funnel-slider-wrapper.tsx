import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useRef, useLayoutEffect } from "react";

type Direction = "forward" | "backward";

interface FunnelSlideWrapperProps extends PropsWithChildren {
  step: string;
  direction: Direction;
}
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

export default function FunnelSlideWrapper({ step, direction, children }: FunnelSlideWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={step}
        ref={scrollRef}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "tween", duration: 0.2 }}
        className="absolute inset-0 overflow-y-auto px-4 pb-24"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
