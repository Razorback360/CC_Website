import { Carousel } from "flowbite-react";

type Slide = {
  src: string;
  label: string;
  description: string;
};

type Props = {
  slides: Slide[];
};

export function ImageCarousel(props: Props) {
  return (
    <Carousel leftControl rightControl>
      {props.slides.map((slide, i) => {
        return (
          <div
            className="flex h-full w-full items-center justify-center dark:text-white"
            key={i}
          >
            <img
              src={slide.src}
              className=" object-cover w-full h-auto"
              alt={slide.description}
            />
            <div className="absolute bottom-0 p-10 mb-5 rounded-lg max-w-xl text-center opacity-90 bg-secondary">
              <h5>{slide.label}</h5>
              <p className=" text-primary">{slide.description}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
