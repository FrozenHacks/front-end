import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

//  COMPONENTS
import EventsCard from "./EventsCard";
import { IoIosTrendingUp } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineHistory, AiTwotoneThunderbolt } from "react-icons/ai";

//  TYPES
import { TEventsCategory } from "../../types/Components";

const EventsCategory = ({ data }: TEventsCategory) => {
  const options = {
    loop: false,
    startIndex: 0,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative z-40 w-full h-full text-white embla">
      <div className="flex flex-col items-center justify-between w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-2">
            {data.title === "Trending" ? (
              <IoIosTrendingUp className="max-sm:text-sm" />
            ) : data.title === "Near By Events" ? (
              <FaLocationDot />
            ) : data.title === "Latest Events" ? (
              <AiOutlineHistory />
            ) : data.title === "Up Coming Events" ? (
              <AiTwotoneThunderbolt />
            ) : (
              <FaRegCalendarAlt />
            )}
            <span className="text-sm tracking-[5%] text-white sm:text-xl">
              {data.title}
            </span>
          </div>
          {/* <button className="text-[8px] tracking-[5%] font-light sm:text-sm text-white/70">
            View All
          </button> */}
        </div>
        <div ref={emblaRef} className="relative w-full h-full embla__viewport">
          <div className="items-center embla__container">
            {data.carousel.map((obj, index) => (
              <EventsCard key={index} data={obj} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 relative !z-50 flex justify-end w-full">
        <div className="embla__buttons ">
          <button
            className="p-3 mr-4 text-black transition-all ease-out bg-white rounded embla__prev hover:bg-white/70"
            onClick={scrollPrev}
          >
            <MdArrowBackIos />
          </button>
          <button
            className="p-3 text-black transition-all ease-out bg-white rounded embla__next hover:bg-white/70"
            onClick={scrollNext}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventsCategory;
