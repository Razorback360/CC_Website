import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay, { type AutoplayOptionsType } from "embla-carousel-autoplay";
import Spotlight from "@/components/landing-page/spotlight";
import ScrollIndicatorArrows from "@/components/scroll-indicator-arrows";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";

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

const autoplayOpts = {
  delay: 2000,
  stopOnInteraction: true,
  playOnInit: true,
} as AutoplayOptionsType;

const HeroSection = () => {
  const [api1, setApi1] = React.useState<CarouselApi>();
  const [api2, setApi2] = React.useState<CarouselApi>();
  const [api3, setApi3] = React.useState<CarouselApi>();
  const [api4, setApi4] = React.useState<CarouselApi>();

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const parallaxText = useTransform(scrollYProgress, [0, 0.9], [0, -200]);
  const parallaxCarousels1 = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
  const parallaxCarousels2 = useTransform(scrollYProgress, [0, 0.6], [0, -200]);
  const parallaxCarousels3 = useTransform(scrollYProgress, [0, 0.7], [0, -200]);
  const parallaxCarousels4 = useTransform(scrollYProgress, [0, 0.9], [0, -200]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0) {
      api1?.plugins()?.autoplay?.stop();
      api2?.plugins()?.autoplay?.stop();
      api3?.plugins()?.autoplay?.stop();
      api4?.plugins()?.autoplay?.stop();
    } else {
      api1?.plugins()?.autoplay?.play();
      api2?.plugins()?.autoplay?.play();
      api3?.plugins()?.autoplay?.play();
      api4?.plugins()?.autoplay?.play();
    }
  });

  return (
    <motion.section
      style={{ opacity }}
      ref={heroRef}
      className="hero flex flex-row items-center justify-between max-h-[100vh] h-fit w-full select-none"
    >
      <Spotlight className="top-40 left-0 md:left-60 md:-top-20 absolute" />
      <Image
        className="select-none z-10 absolute opacity-5 -rotate-[10deg] aspect-square left-[-40%] scale-x-[-1]"
        src="/main-01.png"
        loading="eager"
        width={1024}
        height={1024}
        layout="responsive"
        objectFit="contain"
        alt="backgroung image"
      />
      <motion.div
        style={{
          y: parallaxText,
          opacity,
        }}
        className="flex flex-col items-center justify-center w-full text-primary leading-none font-extrabold"
      >
        <span
          className="2xl:text-[12rem] xl:text-[10rem] lg:text-[8rem] md:text-[7rem] leading-none text-foreground"
          style={{
            fontFamily: "Dancing Script",
            WebkitBackgroundClip: "text",
          }}
        >
          Welcome to
        </span>
        <br />
        <span className="2xl:text-[7rem] xl:text-[6rem] lg:text-[5rem] md:text-[4rem] text-center bg-gradient-to-r from-primary to-[#10B981] bg-clip-text text-transparent font-[Inter]">
          KFUPM <br />
          Computer Club
        </span>
      </motion.div>
      {/* vertical */}
      <div className="grid grid-cols-3 grid-rows-5 items-center justify-center flex-shrink-0 max-h-[100vh] h-fit w-fit max-w-[40%] aspect-[3/5]">
        <motion.div
          style={{
            y: parallaxCarousels1,
          }}
          className="col-span-1 row-span-1 row-start-1 aspect-square"
        >
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
        </motion.div>
        <motion.div
          style={{
            y: parallaxCarousels2,
          }}
          className="col-span-1 row-span-1 row-start-2 aspect-square"
        >
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
        </motion.div>
        <motion.div
          style={{
            y: parallaxCarousels3,
          }}
          className="col-span-2 row-span-2 col-start-2 aspect-square"
        >
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
        </motion.div>
        <motion.div
          style={{
            y: parallaxCarousels4,
          }}
          className="col-span-3 row-span-3 aspect-square"
        >
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
        </motion.div>
      </div>
      <ScrollIndicatorArrows />
    </motion.section>
  );
};

export default HeroSection;
