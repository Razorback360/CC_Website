import Head from "next/head";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "@/components/ui/ImageCarousel";

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

      <div>
        {/* hero image */}
        <div className="h-56 w-screen sm:h-64 xl:h-80 2xl:h-96  z-50">
          <ImageCarousel slides={slides} />
        </div>
      </div>
    </>
  );
}
