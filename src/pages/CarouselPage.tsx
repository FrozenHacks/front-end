import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

//  COMPONENTS
import CarouselCard from "../components/CarouselCard";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const CarouselPage = () => {
  const options = {
    loop: false,
    startIndex: 1,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const ImagesArray = [
    "arijit.jpg",
    "arijit.jpg",
    "arijit.jpg",
    "arijit.jpg",
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="sm:h-screen embla sm:py-28 bg-website-purple-dark flex items-center justify-center w-screen h-full px-40 py-20 lg:h-[80vh] xl:h-screen">
      <div
        ref={emblaRef}
        className="embla__viewport w-60 h-36 sm:w-full sm:h-full relative z-40 mt-16"
      >
        <div className="embla__container items-center w-full h-full">
          {ImagesArray.map((img) => (
            <CarouselCard key={img} img={img} />
          ))}
        </div>
        <div className="embla__controll z-50 flex justify-center mt-6">
          <div className="embla__buttons max-sm:hidden absolute right-0">
            <button
              className="embla__prev hover:bg-white/70 p-3 mr-4 transition-all ease-out bg-white rounded"
              onClick={scrollPrev}
            >
              <MdArrowBackIos />
            </button>
            <button
              className="embla__next hover:bg-white/70 p-3 transition-all ease-out bg-white rounded"
              onClick={scrollNext}
            >
              <MdArrowForwardIos />
            </button>
          </div>
          <div className="embla__dots flex mt-4">
            {ImagesArray.map((_, index) => (
              <button
                key={index}
                className={`embla__dot w-1 h-1 sm:w-3 sm:h-3 mx-2 rounded-full ${
                  selectedIndex === index ? "bg-white" : "bg-white/70"
                }`}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;
