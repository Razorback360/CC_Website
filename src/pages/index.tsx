import Head from "next/head";
import React from "react";
import { StickyScroll } from "@/components/landing-page/sticky-scroll-reveal";
import { api } from "@/utils/api";
import HeroSection from "@/components/landing-page/hero-section";
import VisionSection from "@/components/landing-page/vision-section";

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
  const { data: events } = api.event.getAllPublic.useQuery();

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
      <div className="w-full sm:mt-0 mt-[6.3rem]">
        <HeroSection />
        <VisionSection />
        <StickyScroll events={events} />
        {/* {data.events.map((el, index) => {
              return (
                <Card
                  key={index}
                  className="flex flex-row items-center gap-2 rounded-md p-2 text-sm transition-all h-52"
                >
                  <CardHeader className="p-2 min-h-full h-full w-72 rounded">
                    <img
                      src={el.image}
                      className="object-contain m-auto rounded"
                    ></img>
                  </CardHeader>
                  <div className="flex flex-col h-full w-full justify-between">
                    <CardContent className="p-1 flex flex-col h-full">
                      <p className="text-xl font-bold">{el.name}</p>
                      <Badge
                        className="text-xs max-w-fit mt-2"
                        variant="secondary"
                      >
                        {el.term}
                      </Badge>
                      <p className="text-epllipsis text-xs mt-2 h-full">
                        {el.content}{" "}
                      </p>
                    </CardContent>
                    <CardFooter className="p-1">
                      <Button
                        className="w-full"
                        asChild
                        variant="default"
                        size="sm"
                      >
                        <Link href="...">Register</Link>
                      </Button>{" "}
                    </CardFooter>
                  </div>
                </Card>
              );
            })} */}
        {/* </div> */}
        {/* <section className="justify-center items-center w-full flex flex-col mt-10">
          <h1 className="text-2xl font-bold">Featured Members</h1>
          <div className="flex flex-row w-full h-full items-center justify-center flex-wrap">
            {data.members.map((el, index) => {
              return (
                <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]" key={index}>
                  <CardHeader className="p-4">
                    <img
                      src={el.image}
                      className="w-full object-cover h-40 border border-transparent rounded-md"
                    ></img>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">{el.name}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {el.term}
                    </p>
                    <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                      {el.role}
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section> */}
        {/* <Card
                  className="w-3/4 md:w-1/5 m-10 h-[32rem] h-fit pb-4"
                  key={index}
                >
                  <CardHeader className="p-4">
                    <img
                      src={el.image}
                      className="w-full object-cover h-40 border border-transparent rounded-md"
                    ></img>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">{el.name}</p>
                    <p className="text-sm text-muted-foreground">{el.term}</p>
                    <p>{el.content} </p>
                  </CardContent>

                  <div className="flex justify-center">
                    <Button href="">
                      <span>register here</span>
                    </Button>
                  </div>
                </Card> */}
      </div>
    </>
  );
}
