import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { isAfter } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function Event() {
  const router = useRouter();
  const { id: eventId } = router.query as { id: string };
  const { data: event } = api.event.get.useQuery({ id: eventId });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const toggleGallery = () => setIsGalleryOpen(!isGalleryOpen);

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

  const randomGradient = useMemo(
    () => linearGradients[Math.floor(Math.random() * linearGradients.length)],
    [],
  );

  if (!event) {
    // TODO event does not exist (not found page)
    return <Skeleton />;
  }

  const isEventDone = isAfter(new Date(), event.date);

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
      </Head>
      <main className="flex flex-col justify-center items-center p-20 gap-2 h-full w-full">
        <div className="flex flex-row justify-between items-start pb-20 gap-10 xl:gap-20 h-fit max-h-screen w-full">
          <div
            style={{
              background: randomGradient,
            }}
            className={cn(
              "hidden lg:flex flex-col aspect-[19/23] ms-10 flex-shrink-0",
              // inset y = rest of the height of the screen / 2
              "2xl:h-[80vh] 2xl:inset-y-[10vh] xl:h-[65vh] xl:inset-y-[17.5vh]",
              "lg:h-[50vh] lg:inset-y-[25vh]",
              "p-4 rounded-lg justify-between items-center overflow-hidden ",
              // isGalleryOpen ? "mt-10" : "mt-0",
            )}
          >
            <Image
              className="rounded-lg select-none max-h-full overflow-hidden"
              src={
                // "https://nfjirfbkulkxtgkdqmtn.supabase.co/storage/v1/object/public/images/Web%20Development%20Bootcamp/poster/GFAwUcbWkAAVbkg.jpg"
                event.Attachments.filter(
                  (attachment) => attachment.type === "EVENT_POSTER",
                ).at(0)?.src ?? "/placeholder/event.png"
              }
              loading="eager"
              width={1920}
              height={1080}
              layout="responsive"
              objectFit="contain"
              objectPosition="start"
              alt="event image"
            />
            <Button
              className="w-full mt-4 flex-shrink-0"
              size="xl"
              variant="outline"
              disabled={isEventDone}
              asChild
            >
              <Link href={event.link}>Register</Link>
            </Button>
          </div>
          <div
            className={cn(
              "flex flex-col justify-between items-start gap-4 my-16 me-20 w-full text-white",
              isGalleryOpen ? "h-fit" : "max-h-[80vh] h-full",
            )}
          >
            <h2 className="text-6xl font-bold"> {event.title}</h2>
            <p dir="rtl" className="text-3xl h-full w-full mt-20 text-right">
              {event.description}
            </p>
          </div>
        </div>
        {/* {isEventDone && (
          <>
            <Separator />
            <h1 className="text-7xl sticky font-extrabold my-12">
              Event Gallery
            </h1>
            <div className="w-full h-full bg-red-500">
              <LayoutGrid cards={cards} />
            </div>
          </>
        )} */}
      </main>
    </>
  );
}

const cards = [
  {
    id: 1,
    content: <Skeleton />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <Skeleton />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <Skeleton />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <Skeleton />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
