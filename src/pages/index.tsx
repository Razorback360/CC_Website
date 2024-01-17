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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const slides = [
    {
      src: "/landing-page-hero.jpg",
      label: "Image 1",
      description: "This is test image 1",
    },
    {
      src: "/landing-page-hero.jpg",
      label: "Image 2",
      description: "This is test image 2",
    },
    {
      src: "/landing-page-hero.jpg",
      label: "Image 1",
      description: "This is test image 2",
    },
  ];
  // the data is for rendering the events and members cards
  const data = {
    events: [
      {
        name: "Event Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        content: "Lorem impsum dolor amet Lorem impsum dolor amet",
      },
      {
        name: "Event Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        content:
          "Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum dolor amet",
      },
      {
        name: "Event Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        content:
          "Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum dolor amet",
      },
      {
        name: "Event Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        content:
          "Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum dolor amet",
      },
    ],
    members: [
      {
        name: "Member Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        role: "Leader",
      },
      {
        name: "Member Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        role: "Leader",
      },
      {
        name: "Member Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        role: "Leader",
      },
      {
        name: "Member Name",
        term: "T231",
        image: "/landing-page-hero.jpg",
        role: "Leader",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Computer Club - KFUPM</title>
        <meta name="description" content="Home of KFUPM's Computer Club" />
      </Head>
      <div className="w-[99vw]">
        {/* hero image */}
        <div className=" m-5 z-50">
          <ImageCarousel slides={slides} className="h-96 md:h-96" />
        </div>
        <section className="justify-center items-center w-full flex flex-col mt-10">
          <h1 className="text-2xl font-bold">Featured Events</h1>
          <div className="grid grid-cols-2 gap-4 pt-8 px-4 w-full h-full items-center justify-center flex-wrap">
            {data.events.map((el, index) => {
              return (
                <Card
                  key={index}
                  className="flex flex-row items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all text-stone-900 hover:bg-stone-200"
                >
                  <CardHeader className="p-4">
                    <img
                      src={el.image}
                      className="w-3/2 object-cover border h-40 border-transparent rounded-lg"
                    ></img>
                  </CardHeader>
                  <div className="flex flex-col items-end">
                    <CardContent>
                      <p className="text-xl">{el.name}</p>
                      <Badge
                        className="text-sm text-muted-foreground"
                        variant="secondary"
                      >
                        {el.term}
                      </Badge>
                      <p className="text-epllipsis">{el.content} </p>
                    </CardContent>
                    <Button className="flex justify-center" variant="default">
                      <Link href="...">Register</Link>
                    </Button>
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
                      className="w-full object-cover h-40 border border-transparent rounded-lg"
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
                      className="w-full object-cover h-40 border border-transparent rounded-lg"
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
