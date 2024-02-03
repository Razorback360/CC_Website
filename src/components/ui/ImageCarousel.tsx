import { Carousel } from "flowbite-react";

type Slide = {
  src: string;
  label: string;
  description: string;
};

type Props = {
  slides: Slide[];
} & React.HTMLAttributes<HTMLImageElement>;

export function ImageCarousel(props: Props) {
  return (
    <Carousel leftControl rightControl className={props.className}>
      {props.slides.map((slide, i) => {
        return (
          <div
            className="flex h-full w-2/3 items-center justify-center dark:text-white"
            key={i}
          >
            <img
              src={slide.src}
              className={`${props.className} object-cover w-full  rounded-lg`}
              alt={slide.description}
            />
            <div className="absolute bottom-0 p-5 md:p-10 mb-10 rounded-lg max-w-xl text-center opacity-90 bg-secondary ">
              <h5>{slide.label}</h5>
              <p className=" text-primary">{slide.description}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
