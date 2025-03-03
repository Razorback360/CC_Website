import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/utils/api";
import { type Event } from "@prisma/client";
import { compareAsc, isAfter } from "date-fns";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export const activeEventAtom = atom<number>(0);

export const useActiveEvent = () => {
  const [activeEvent, setActiveEventAtom] = useAtom(activeEventAtom);

  const setActiveEvent = (eventIndex: number) => {
    setActiveEventAtom(eventIndex);
  };

  return { activeCard: activeEvent, setActiveCard: setActiveEvent };
};

interface StickyScrollProps {
  events: RouterOutputs["event"]["getAll"] | undefined;
}

export const StickyScroll = ({ events }: StickyScrollProps) => {
  const { activeCard, setActiveCard } = useActiveEvent();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundColors = ["#0f172a", "#171717", "#2d3748", "#1a202c"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
    "linear-gradient(to bottom right, #f59e0b, #84cc16)",
    "linear-gradient(to bottom right, #f472b6, #7c3aed)",
    "linear-gradient(to bottom right, #ff0000, #00ff00)",
    "linear-gradient(to bottom right, #0000ff, #ffff00)",
    "linear-gradient(to bottom right, #ff00ff, #00ffff)",
  ];

  const sortedEvents = events?.sort((a, b) => {
    // orders according to the date (closest to current date first)
    return compareAsc(a.date, b.date);
  });

  const pastEvents = sortedEvents?.filter((event) => {
    // filters out events that have already passed
    return isAfter(new Date(), event.date);
  });
  const upcomingEvents = sortedEvents?.filter((event) => {
    // filters out events that have already passed
    return isAfter(event.date, new Date());
  });

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return (
      <div className=" select-none flex flex-col gap-8 justify-center items-center h-[150vh] bg-gray-700">
        <h2
          className="animate-floating text-6xl font-extrabold text-gray-400"
          style={{ textShadow: "0 0 6rem black" }}
        >
          No Upcoming Events
        </h2>
        <p
          // style={{ textShadow: "0 0 2rem black" }}
          className="text-gray-500 font-semibold text-2xl z-10"
        >
          Check back later for more events.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="flex justify-between items-start relative pl-10 pr-20 py-32 gap-10"
      style={{
        // number of events * 100vh
        height: `${(upcomingEvents?.length ?? 3) * 100}vh`,
      }}
      ref={ref}
      id="events"
    >
      <div className="div relative flex flex-col items-start w-full h-full">
        {upcomingEvents.map((event, index) => (
          <EventCard key={event.title + index} item={event} index={index} />
        ))}
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className={cn(
          "hidden lg:flex flex-col aspect-[19/23]",
          // inset y = rest of the height of the screen / 2
          "2xl:h-[80vh] 2xl:inset-y-[10vh] xl:h-[65vh] xl:inset-y-[17.5vh]",
          "lg:h-[50vh] lg:inset-y-[25vh]",
          "p-4 rounded-lg sticky justify-between items-center",
        )}
      >
        <Image
          className="rounded-lg select-none max-h-full overflow-hidden"
          src={
            upcomingEvents?.at(activeCard)?.Attachments.at(0)?.src ??
            `/event (${(activeCard % 4) + 1}).png`
            // TODO @SauceX22 "/images/no_poster.png" add a no poster found image
          }
          loading="lazy"
          width={1920}
          height={1080}
          layout="responsive"
          objectFit="contain"
          alt="event image"
        />
        <Button
          className="w-full mt-4 flex-shrink-0"
          size="xl"
          variant="outline"
          asChild
        >
          <Link href={`/events/${upcomingEvents?.at(activeCard)?.id}`}>
            View
          </Link>
        </Button>
      </motion.div>
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
    [0, 0.4, 0.55, 1],
    [0.7, 1, 1, 0.7],
  );
  const startPadding = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 1],
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
        type: "inertia",
        ease: [0.5, 0, 0.5, 1],
      }}
      className="max-h-screen h-[90vh] min-w-[30vw] text-white"
    >
      <motion.h2
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: activeCard === index ? 1 : 0.3,
        }}
        className="text-7xl font-bold"
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
        className="text-xl max-w-4xl h-fit w-full mt-12"
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
