import React, { useRef, useState, useCallback, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  type SpringOptions,
} from "framer-motion";

interface MomentumScrollProps {
  children: React.ReactNode;
}

const MomentumScroll = ({ children }: MomentumScrollProps): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollableHeight, setScrollableHeight] = useState<number>(0);

  const resizeScrollableHeight = useCallback(
    (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setScrollableHeight(entry.contentRect.height);
      }
    },
    [],
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizeScrollableHeight(entries),
    );
    scrollRef.current && resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollY } = useScroll();

  const negativeScrollY = useTransform(
    scrollY,
    [0, scrollableHeight],
    [0, -scrollableHeight],
  );

  const springPhysics: SpringOptions = {
    // Damping controls how much the spring oscillates.
    // A higher value will result in less oscillation.
    damping: 22,
    // Mass determines the heaviness of the object attached to the spring.
    // A lower mass makes the scrolling feel lighter.
    mass: 0.1,
    // Stiffness controls how stiff the spring is.
    // A higher value will make the scrolling feel more rigid.
    stiffness: 200,
    // Bounce determines how much the spring bounces at the ends.
    // A higher value results in stronger bouncing.
    bounce: 0.5,
    // Duration sets the time it takes for the spring animation to complete.
    // A shorter duration makes the scrolling animation faster.
    duration: 0.4,
    // Velocity determines the initial velocity of the spring.
    // A higher velocity will make the scrolling start faster.
    velocity: 100,
  };

  const springNegativeScrollY = useSpring(negativeScrollY, springPhysics);

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: springNegativeScrollY }}
        className="scroll-container fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>

      <div style={{ height: scrollableHeight }} />
    </>
  );
};

export default MomentumScroll;
