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
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Event Name</p>
                <p className="text-sm text-muted-foreground">T231</p>
                <p>
                  Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum
                  dolor amet{" "}
                </p>
              </CardContent>
            </Card>
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Event Name</p>
                <p className="text-sm text-muted-foreground">T231</p>
                <p>
                  Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum
                  dolor amet{" "}
                </p>
              </CardContent>
            </Card>
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Event Name</p>
                <p className="text-sm text-muted-foreground">T231</p>
                <p>
                  Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum
                  dolor amet{" "}
                </p>
              </CardContent>
            </Card>
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Event Name</p>
                <p className="text-sm text-muted-foreground">T231</p>
                <p>
                  Lorem impsum dolor amet Lorem impsum dolor amet Lorem impsum
                  dolor amet{" "}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="justify-center items-center w-full flex flex-col mt-10">
          <h1 className="text-2xl font-bold">Featured Members</h1>
          <div className="flex flex-row w-full h-full items-center justify-center flex-wrap">
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Member Name</p>
                <p className="text-sm text-muted-foreground mb-4">T231</p>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
              </CardContent>
            </Card>
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Member Name</p>
                <p className="text-sm text-muted-foreground mb-4">T231</p>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
              </CardContent>
            </Card>
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Member Name</p>
                <p className="text-sm text-muted-foreground mb-4">T231</p>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
              </CardContent>
            </Card>
            <Card className="w-3/4 md:w-1/5 m-10 h-[32rem]">
              <CardHeader className="p-4">
                <img
                  src="/landing-page-hero.jpg"
                  className="w-full object-cover h-40 border border-transparent rounded-lg"
                ></img>
              </CardHeader>
              <CardContent>
                <p className="text-xl">Member Name</p>
                <p className="text-sm text-muted-foreground mb-4">T231</p>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
                <a className="py-1 px-2 text-md rounded-full bg-primary mr-2">
                  Leader
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
