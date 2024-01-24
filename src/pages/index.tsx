import Head from "next/head";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    src: "/event (1).jpg",
    label: "Image 1",
    description: "This is test image 1",
  },
  {
    src: "/event (2).jpg",
    label: "Image 2",
    description: "This is test image 2",
  },
  {
    src: "/event (3).jpg",
    label: "Image 1",
    description: "This is test image 2",
  },
  {
    src: "/event (4).jpg",
    label: "Image 1",
    description: "This is test image 2",
  },
];
// the data is for rendering the events and members cards
const data = {
  events: [
    {
      name: "ICS 108 Help Session",
      term: "T231",
      image: "/event (1).jpg",
      content: "Help session for ICS 108 students",
    },
    {
      name: "ICS 253 Help Session",
      term: "T231",
      image: "/event (2).jpg",
      content: "Help session for ICS 253 students",
    },
    {
      name: "Hack Me",
      term: "T231",
      image: "/event (3).jpg",
      content: "Learn how Cybersecurity works",
    },
    {
      name: "Git And Github Workshop",
      term: "T231",
      image: "/event (4).jpg",
      content: "Learn how to use git and github",
    },
  ],
  members: [
    {
      name: "Member Name",
      term: "T231",
      image: "/event (1).jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/event (1).jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/event (1).jpg",
      role: "Leader",
    },
    {
      name: "Member Name",
      term: "T231",
      image: "/event (1).jpg",
      role: "Leader",
    },
  ],
};

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
      </Head>
      <div className="w-[99vw]">
        {/* hero image */}
        <div className="m-4 z-50">
          {/* <ImageCarousel slides={slides} className="h-96 md:h-96" /> */}
          <Carousel
            className="w-2/3 mx-auto h-[32rem]"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="md:basis-1/2 pl-4">
                  <div className="md:px-0 px-1 py-1">
                    <Card className="p-4 h-[32rem]">
                      <img
                        className="object-contain object-center m-auto rounded h-full"
                        alt={slide.description}
                        src={slide.src}
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-12 h-12 my-auto" />
            <CarouselNext className="w-12 h-12 my-auto" />
          </Carousel>
        </div>
        <section className="justify-center items-center m-auto flex flex-col mt-10 w-2/3">
          <h1 className="text-2xl font-bold">Featured Events</h1>
          <div className="grid grid-cols-2 gap-4 pt-8 px-4 w-full h-full items-center justify-center flex-wrap">
            {data.events.map((el, index) => {
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
            })}
          </div>
        </section>
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
