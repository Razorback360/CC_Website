import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { type Event } from "@prisma/client";
import { cn } from "@/lib/utils";
import { atom, useAtom } from "jotai";

export const activeEventAtom = atom<number>(0);

export const useActiveEvent = () => {
  const [activeEvent, setActiveEventAtom] = useAtom(activeEventAtom);

  const setActiveEvent = (eventIndex: number) => {
    setActiveEventAtom(eventIndex);
  };

  return { activeCard: activeEvent, setActiveCard: setActiveEvent };
};

interface StickyScrollProps {
  events: (Event & object)[] | undefined;
}

export const StickyScroll = ({ events }: StickyScrollProps) => {
  const { activeCard, setActiveCard } = useActiveEvent();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundColors = ["#0f172a", "#000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];
  return (
    <motion.section
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="flex justify-between items-start relative pl-10 pr-20 py-20"
      style={{
        // number of events * 100vh
        height: `${events?.length ?? 3 * 100}vh`,
      }}
      ref={ref}
    >
      <div className="div relative flex flex-col items-start w-full h-full py-10">
        {events?.map((event, index) => (
          <EventCard key={event.title + index} item={event} index={index} />
        ))}
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className="hidden lg:block h-[60vh] aspect-square flex-shrink-0 rounded-md bg-white sticky inset-y-[20vh] overflow-hidden"
      ></motion.div>
    </motion.section>
  );
};

type EventCardProps = {
  item: Event & object;
  index: number;
};

const EventCard = ({ item, index }: EventCardProps) => {
  const cardRef = useRef(null);
  const { activeCard, setActiveCard } = useActiveEvent();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start center", "end center"],
  });

  const size = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.7, 1, 1, 0.7],
  );
  const startPadding = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    ["0%", "10%", "10%", "0%"],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0) {
      setActiveCard(index);
    }
  });

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: size,
        paddingLeft: startPadding,
      }}
      transition={{
        type: "spring",
        ease: [0.5, 0, 0.5, 1],
      }}
      className="h-full min-h-[90vh]"
    >
      <motion.h2
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: activeCard === index ? 1 : 0.3,
        }}
        className="text-7xl font-bold text-secondary-foreground"
      >
        {item.title}
      </motion.h2>
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: activeCard === index ? 1 : 0.3,
        }}
        className="text-xl text-secondary-foreground max-w-4xl w-full mt-12"
      >
        {item.description}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
        quae facere id quas, sunt itaque minima sapiente consequuntur laudantium
        mollitia repudiandae inventore! Iusto veniam beatae officia tenetur
        maiores debitis dignissimos? Voluptatum nulla nisi harum aliquam, ea
        corporis et ipsam quo tenetur mollitia atque dolorem voluptatibus totam
        reiciendis repudiandae quisquam ut quas excepturi nemo eligendi?
        Inventore natus magnam ea cum excepturi. Est voluptatibus modi eveniet
        natus porro nisi cupiditate, minima, minus nihil ipsum molestias ut,
        rerum ducimus eum. Eos amet dolorem accusamus beatae, aut, quisquam
        consectetur, quod excepturi consequuntur odit iusto! Deserunt sapiente
        vero reprehenderit pariatur repellendus saepe accusantium atque dicta
        nulla. Quibusdam totam nemo vero quisquam, corporis veritatis deleniti
        maiores ratione omnis amet incidunt optio rem laborum natus officia
        perferendis. Delectus repellendus minus laborum quidem! Enim, sunt
        explicabo nisi, officiis odit similique sit molestiae libero quam culpa
        reprehenderit corrupti, aliquid fugit expedita tenetur assumenda
        mollitia rerum quas quia voluptas cum! Porro expedita optio tenetur quos
        odit inventore dolores at reprehenderit, enim, itaque dolor qui dolore.
        Architecto explicabo tempora, facere impedit eius minus, molestiae non
        asperiores minima exercitationem recusandae excepturi perspiciatis. Rem
        eum, dicta ex pariatur cupiditate corporis nisi beatae optio enim
        recusandae minus odio quisquam! Repellendus odit iste aspernatur
        adipisci minima ex repudiandae facere, sequi cumque beatae! Nemo, rem.
        Quis? Fugiat aperiam, consequatur dignissimos, temporibus ut ducimus
        atque iure sed nulla nisi ab quasi id. Magni animi labore velit corrupti
        vel deleniti nam perspiciatis mollitia unde? Beatae error quam nesciunt.
        Totam a sed possimus iste voluptates, exercitationem consequatur amet,
        voluptatem sequi modi ipsam doloremque beatae nulla, explicabo
        recusandae odit. Quaerat similique corporis at vitae libero
        exercitationem architecto optio iste odio! Ex dolorum eligendi modi nisi
        debitis eveniet, similique dicta aperiam vero tenetur inventore
        excepturi id temporibus iusto molestiae autem ullam ut explicabo dolores
        ab fuga amet! Facilis consequatur deserunt in.
      </motion.p>
    </motion.div>
  );
};
