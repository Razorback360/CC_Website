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
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import Spotlight from "@/components/landing-page/spotlight";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "/1-1.jpg",
    label: "Image 1",
    description: "This is test image 1",
  },
  {
    src: "/1-1.jpg",
    label: "Image 2",
    description: "This is test image 2",
  },
  {
    src: "/1-1.jpg",
    label: "Image 1",
    description: "This is test image 2",
  },
  {
    src: "/1-1.jpg",
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

const autoplayOpts = {
  delay: 2000,
  stopOnInteraction: true,
  playOnInit: true,
} as AutoplayOptionsType;

export default function Home() {
  const [api1, setApi1] = React.useState<CarouselApi>();
  const [api2, setApi2] = React.useState<CarouselApi>();
  const [api3, setApi3] = React.useState<CarouselApi>();
  const [api4, setApi4] = React.useState<CarouselApi>();

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
        <div className="greeting/carousel-section flex flex-row items-center justify-between max-h-[100vh] h-fit w-full select-none">
          <Spotlight className="top-40 left-0 md:left-60 md:-top-20 absolute" />
          <div className="flex flex-col items-center justify-center w-full text-primary text-6xl font-extrabold">
            <span
              className="text-[12rem] leading-none text-foreground"
              style={{
                fontFamily: "Dancing Script",
                WebkitBackgroundClip: "text",
              }}
            >
              Welcome to
            </span>
            <br />
            <span
              className="text-[8rem] text-center"
              style={{
                fontFamily: "Inter",
                background: "linear-gradient(to right, #1D4ED8, #10B981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              KFUPM <br />
              Computer Club
            </span>
          </div>
          {/* vertical */}
          <div className="grid grid-cols-3 grid-rows-5 items-center justify-center flex-shrink-0 max-h-[100vh] h-fit w-fit max-w-[40%] aspect-[3/5]">
            <div className="col-span-1 row-span-1 row-start-1 aspect-square">
              <Carousel
                className="embla h-full w-full overflow-hidden"
                orientation="horizontal"
                dir="rtl"
                opts={{
                  loop: true,
                  direction: "rtl",
                }}
                setApi={setApi1}
                plugins={[Autoplay(autoplayOpts)]}
                onMouseEnter={api1?.plugins()?.autoplay?.stop}
                onMouseLeave={() => {
                  api1?.plugins()?.autoplay?.reset();
                  api1?.plugins()?.autoplay?.play();
                }}
              >
                <CarouselContent className="w-full h-full m-0">
                  {slides.map((slide, index) => (
                    <CarouselItem key={index} className="p-0">
                      <img
                        className="object-contain object-center h-full w-full"
                        alt={slide.description}
                        src={slide.src}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 aspect-square">
              <Carousel
                className="embla h-full w-full overflow-hidden"
                orientation="horizontal"
                opts={{
                  loop: true,
                }}
                setApi={setApi2}
                plugins={[Autoplay(autoplayOpts)]}
                onMouseEnter={api2?.plugins()?.autoplay?.stop}
                onMouseLeave={() => {
                  api2?.plugins()?.autoplay?.reset();
                  api2?.plugins()?.autoplay?.play();
                }}
              >
                <CarouselContent className="w-full h-full m-0">
                  {slides.map((slide, index) => (
                    <CarouselItem key={index} className="p-0 w-full h-full">
                      <img
                        className="object-cover object-center h-full w-full"
                        alt={slide.description}
                        src={slide.src}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="col-span-2 row-span-2 col-start-2 aspect-square">
              <Carousel
                className="embla h-full w-full"
                orientation="horizontal"
                opts={{
                  loop: true,
                }}
                setApi={setApi3}
                plugins={[Autoplay(autoplayOpts)]}
                onMouseEnter={api3?.plugins()?.autoplay?.stop}
                onMouseLeave={() => {
                  api3?.plugins()?.autoplay?.reset();
                  api3?.plugins()?.autoplay?.play();
                }}
              >
                <CarouselContent className="m-0">
                  {slides.map((slide, index) => (
                    <CarouselItem key={index} className="p-0">
                      <img
                        className="object-cover object-start h-full w-full"
                        alt={slide.description}
                        src={slide.src}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="col-span-3 row-span-3 aspect-square">
              <Carousel
                className="embla h-full w-full"
                orientation="horizontal"
                dir="rtl"
                opts={{
                  loop: true,
                  direction: "rtl",
                }}
                setApi={setApi4}
                plugins={[Autoplay(autoplayOpts)]}
                onMouseEnter={api4?.plugins()?.autoplay?.stop}
                onMouseLeave={() => {
                  api4?.plugins()?.autoplay?.reset();
                  api4?.plugins()?.autoplay?.play();
                }}
              >
                <CarouselContent className=" m-0">
                  {slides.map((slide, index) => (
                    <CarouselItem key={index} className="p-0 w-full h-full">
                      <img
                        className="object-contain object-center "
                        alt={slide.description}
                        src={slide.src}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          {/* position middle of the screen down to indicate scrolling past the first section of the page */}
          <div className="absolute bottom-0 inset-x-0 flex justify-center items-end pb-20 w-full h-screen opacity-50">
            <div className="chevron w-9 h-2"></div>
            <div className="chevron w-9 h-2"></div>
            <div className="chevron w-9 h-2"></div>
          </div>
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
