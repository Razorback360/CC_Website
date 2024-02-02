import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React from "react";

function ScrollIndicatorArrows() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = React.useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // top of page only
    if (current < 0.1) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <div
      className={cn(
        "absolute bottom-0 inset-x-0 flex justify-center items-end mb-20 w-full h-fit transition-opacity duration-300",
        visible ? "opacity-50" : "opacity-0",
      )}
    >
      <div className="chevron w-9 h-2"></div>
      <div className="chevron w-9 h-2"></div>
      <div className="chevron w-9 h-2"></div>
    </div>
  );
}

export default ScrollIndicatorArrows;
