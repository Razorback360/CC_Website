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
          <div className="flex flex-row w-full h-full items-center justify-center flex-wrap">
            {data.events.map((el, index) => {
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
                    <p className="text-sm text-muted-foreground">{el.term}</p>
                    <p>{el.content} </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        <section className="justify-center items-center w-full flex flex-col mt-10">
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
        </section>
      </div>
    </>
  );
}
