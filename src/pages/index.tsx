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
  CarouselApi,
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

const pluginSettings = {
  delay: 200,
  stopOnMouseEnter: false,
  stopOnInteraction: false,
  active: true,
  playOnInit: true,
};

export default function Home() {
  const plugin1 = React.useRef(Autoplay(pluginSettings));
  const [api1, setApi1] = React.useState<CarouselApi>();
  const [api2, setApi2] = React.useState<CarouselApi>();
  const [api3, setApi3] = React.useState<CarouselApi>();
  const [api4, setApi4] = React.useState<CarouselApi>();

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
      </Head>
      <div className="w-full sm:mt-0 mt-[6.3rem]">
        <div className="greeting/carousel-section flex flex-row items-center justify-between max-h-[100vh] h-fit w-full select-none">
          <div
            className="flex flex-col items-center justify-center w-64 text-primary text-xl font-extrabold font-mono"
            style={{ textShadow: "0 0 1rem primary" }}
          >
            KFUPM Computer Club
          </div>
          {/* vertical */}
          <div className="grid grid-cols-3 grid-rows-5 items-center justify-center max-h-[100vh] h-fit w-fit max-w-[40%] aspect-[3/5]">
            <div className="col-span-1 row-span-1 row-start-1 aspect-square">
              <Carousel
                setApi={setApi1}
                className="h-full w-full overflow-hidden"
                orientation="vertical"
                dir="rtl"
                opts={{
                  loop: true,
                  direction: "rtl",
                  axis: "y",
                }}
                plugins={[plugin1.current]}
                onMouseEnter={plugin1.current.stop}
                onMouseLeave={plugin1.current.reset}
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
                setApi={setApi2}
                className="h-full w-full overflow-hidden"
                orientation="vertical"
                opts={{
                  loop: true,
                  axis: "y",
                }}
                plugins={[plugin1.current]}
                onMouseEnter={plugin1.current.stop}
                onMouseLeave={plugin1.current.reset}
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
                setApi={setApi3}
                className="h-full w-full"
                orientation="horizontal"
                opts={{
                  loop: true,
                }}
                plugins={[plugin1.current]}
                onMouseEnter={plugin1.current.stop}
                onMouseLeave={plugin1.current.reset}
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
                setApi={setApi4}
                className="h-full w-full"
                orientation="horizontal"
                opts={{
                  loop: true,
                }}
                plugins={[plugin1.current]}
                onMouseEnter={plugin1.current.stop}
                onMouseLeave={plugin1.current.reset}
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
