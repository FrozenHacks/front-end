import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useMemo } from "react";

//  COMPONENTS
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

//  SLICES
import { setSelectedEvent } from "../../slices/EventSlice";

//  TYPES
import { TEventsCard } from "../../types/Components";

const EventsCard = ({ data }: TEventsCard) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const starCalc = useMemo(() => {
    const whole = Math.floor(parseInt(data.rating.$numberDecimal));
    const half = parseInt(data.rating.$numberDecimal) - whole !== 0;
    const empty = 5 - whole - (half ? 1 : 0);
    return { complete: whole, half, empty };
  }, [data.rating]);

  const toggleLike = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEvent = (data: any) => {
    dispatch(setSelectedEvent(data));
    window.sessionStorage.setItem('event',JSON.stringify(data))
  }

  return (
    <button
      onClick={() => {
        handleEvent(data)
        navigate("/event/details");
      }}
      className="rounded-2xl flex flex-col h-full ml-4 mr-4 text-white"
    >
      {/* IMAGE CODE */}
      <div className="w-[100px] sm:w-[230px] rounded-xl overflow-hidden h-[140px] sm:h-[300px] text-black relative">
        <img
          src={data?.images[0]?.img}
          alt="Artist Name"
          className="object-cover w-full h-full"
        />
        <div className="top-2 sm:top-4 right-2 sm:right-4 absolute">
          {liked ? (
            <button onClick={toggleLike}>
              <FaHeart className="text-sm text-red-600" />
            </button>
          ) : (
            <button onClick={toggleLike}>
              <FaRegHeart className="text-sm text-white" />
            </button>
          )}
        </div>
      </div>
      {/* INFORMATIONAL CODE */}
      <div className="h-fit flex flex-col w-[230px] flex-wrap mt-2">
        <div className="flex flex-col text-white">
          <span className="text-xs tracking-[2%] text-start">{data.title}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-[2px] sm:gap-1">
              {new Array(starCalc.complete).fill(null).map((_, index) => {
                return (
                  <FaStar key={index} className="text-amber-400  text-[10px]" />
                );
              })}
              {starCalc.half && (
                <FaRegStarHalfStroke className="text-amber-400 text-[10px]" />
              )}
              {new Array(starCalc.empty).fill(null).map((_, index) => {
                return (
                  <FaRegStar
                    key={index}
                    className="text-amber-400  text-[10px]"
                  />
                );
              })}
            </div>
            <p className="text-[10px] sm:text-[12px] whitespace-nowrap font-light">
              {data.rating.$numberDecimal} out of 5
            </p>
          </div>
          <div className="sm:gap-2 whitespace-nowrap flex items-center gap-1 mt-3">
            <img
              src="/icons/calender.png"
              alt="cal"
              className="w-[10px] h-[10px] sm:h-4 sm:w-4 object-fit"
            />
            <p className="text-white/70 text-[10px] sm:text-[13px]">
              {new Date(data.start_date).toLocaleDateString()} |{" "}
              {new Date(data.end_time).toLocaleTimeString()}
            </p>
          </div>
          <div className="sm:gap-2 flex items-center flex-shrink-0 gap-1 mt-1">
            <IoLocationSharp className="mt-1 text-[10px]" />
            <p className="text-white/70 text-[10px] sm:text-[13px]">
              {data.city}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default EventsCard;
