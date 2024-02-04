import EventsGrid from "@/components/landing-page/events-grid";
import HeroSection from "@/components/landing-page/hero-section";
import VisionSection from "@/components/landing-page/vision-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/utils/api";
import Head from "next/head";

// the data is for rendering the events and members cards
const data = {
  events: [
    {
      name: "ICS 108 Help Session",
      term: "T231",
      image: "/1-1.jpg",
      content: "Help session for ICS 108 students",
    },
    {
      name: "ICS 253 Help Session",
      term: "T231",
      image: "/1-1.jpg",
      content: "Help session for ICS 253 students",
    },
    {
      name: "Hack Me",
      term: "T231",
      image: "/1-1.jpg",
      content: "Learn how Cybersecurity works",
    },
    {
      name: "Git And Github Workshop",
      term: "T231",
      image: "/1-1.jpg",
      content: "Learn how to use git and github",
    },
  ],
  members: [
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/1-1.jpg",
      role: "Leader",
    },
  ],
};

export default function Home() {
  const { data: upcomingEvents } = api.event.getAllUpcomingPublic.useQuery();
  const { data: pastEvents } = api.event.getAllPastPublic.useQuery();

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
        {/* import pacifico and dancing script, and inter fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="w-full transition-all">
        <HeroSection />
        <VisionSection />
        <Tabs
          defaultValue="upcoming"
          id="events"
          className="justify-center items-center mx-auto flex flex-col w-full 2xl:w-[75%] 2xl:px-16 lg:px-8 px-4"
        >
          <h1 className="text-7xl font-extrabold my-12">Featured Events</h1>
          <TabsList className="mx-auto h-fit rounded-lg gap-2">
            <TabsTrigger
              value="upcoming"
              className="rounded-lg w-full py-4 text-xl"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="rounded-lg w-full py-4 text-xl"
            >
              Past Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="w-full h-fit">
            <EventsGrid events={upcomingEvents} />
          </TabsContent>
          <TabsContent value="past" className="w-full h-fit">
            <EventsGrid events={pastEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
