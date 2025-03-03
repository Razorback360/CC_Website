import Spotlight from "@/components/landing-page/spotlight";
import ScrollIndicatorArrows from "@/components/scroll-indicator-arrows";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay, { type AutoplayOptionsType } from "embla-carousel-autoplay";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React from "react";

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
    offset: ["start start", "end start"],
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
      className={cn(
        "hero relative flex md:flex-col flex-col-reverse items-center justify-end lg:justify-between",
        "lg:flex-row min-h-[100vh] max-h-[100vh] h-fit w-full select-none pt-[11.3vh] lg:pt-0",
      )}
    >
      <Spotlight className="top-64 left-0 md:left-60 md:-top-20 lg:absolute hidden" />
      <img
        className="select-none z-0 lg:z-10 absolute opacity-5 -rotate-[10deg] top-96 md:top-auto left-[-10%] scale-x-[-1] blur-sm"
        draggable={false}
        src="/main-01.png"
        loading="eager"
        alt="backgroung image"
      />
      <motion.div
        style={{
          y: parallaxText,
          opacity,
        }}
        className="flex flex-col items-center justify-center w-full text-primary leading-none font-extrabold h-[40vh] px-4 lg:h-auto lg:px-6"
      >
        <span
          className="2xl:text-[10rem] xl:text-[8rem] lg:text-[7rem] md:text-[7rem] text-[5rem] leading-none text-foreground"
          style={{
            fontFamily: "Dancing Script",
            WebkitBackgroundClip: "text",
          }}
        >
          Welcome to
        </span>
        <br />
        <span className="2xl:text-[6rem] xl:text-[5.5rem] lg:text-[4rem] md:text-[3.5rem] text-[3.25rem] text-center bg-gradient-to-r from-primary to-[#10B981] bg-clip-text text-transparent font-[Inter]">
          KFUPM <br className="hidden lg:inline" />
          Computer Club
        </span>
      </motion.div>
      {/* vertical */}
      <div
        className={cn(
          "grid grid-cols-3 lg:grid-rows-5 items-center justify-center flex-shrink-0 max-h-[100vh]",
          "h-full lg:h-fit w-full lg:w-fit lg:max-w-[50%] lg:aspect-[3/5] z-10",
        )}
      >
        <motion.div
          style={{
            y: parallaxCarousels1,
          }}
          className="col-span-1 row-span-1 row-start-1 aspect-square hidden lg:block"
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
          className="col-span-1 row-span-1 row-start-2 aspect-square hidden lg:block"
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
          className="col-span-2 row-span-2 col-start-2 aspect-square hidden lg:block"
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
