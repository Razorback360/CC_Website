import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import React from "react";

const VisionSection = () => {
  const visionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visionRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1.1], [1, 0]);

  return (
    <motion.section
      style={{ opacity }}
      id="about-us"
      ref={visionRef}
      className={cn(
        "flex flex-col items-center justify-center w-full h-[170vh] md:p-40 p-8 bg-primary",
        "bg-gradient-to-br from-primary to-[#10B981]",
      )}
    >
      <div className="sticky top-1/2 translate-y-[-50%]">
        <h1 className="text-8xl text-center text-primary-foreground font-extrabold">
          Our Vision
        </h1>
        <p className="text-center text-xl mt-8 max-w-3xl text-primary-foreground font-bold">
          Enhancing and Preparing Students for the Job Market or Further
          Studies, Which Actively Contributes to SAUDI ARABIA&apos;S VISION
          2030. It Aligns with the Vision&apos;s Goals of Developing a Highly
          Skilled Workforce and Promoting Educational Excellence, Ensuring that
          Students are Equipped to Contribute to the Country&apos;s Economic and
          Technological Growth.
        </p>
      </div>
    </motion.section>
  );
};

export default VisionSection;
