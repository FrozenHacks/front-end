import { useRef, useMemo } from "react";

//  COMPONENT
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserHistory from "./UserHistory";
import { useSelector } from "react-redux";
import { RootState } from "../types/Slices";
import MostLikedArtist from "../components/EventsPage/MostLikedArtist";
import EventsCategory from "../components/EventsPage/EventsCategory";

const ProfilePageHistory = () => {

  const ref = useRef<HTMLDivElement | null>(null);
  const latestEvents = useSelector(
    (state: RootState) => state.EventSlice.value.latestEvents
  );
  const nearByEvents = useSelector(
    (state: RootState) => state.EventSlice.value.nearByEvents
  );
  const data = useMemo(() => {
    return [
      {
        title: "Latest Events",
        carousel: latestEvents,
      },
      {
        title: "Near By Events",
        carousel: nearByEvents,
      },
    ];
  }, [latestEvents, nearByEvents]);


  
  return (
    <div className="h-fit relative flex flex-col items-center w-screen overflow-y-scroll">
      <Navbar ModalRef={ref} />
      <div className="py-28 bg-website-purple bg-gradient-to-b from-website-purple to-website-purple-dark h-fit shrink-0 flex items-start w-full gap-5 px-40">
        {/* <div className="opacity-40 absolute inset-0 z-10 bg-black"></div> */}
        <div className="h-fit z-20 flex flex-col w-full mt-4">
         
          <UserHistory />

          {/* Trending Events Section */}
          <div className="flex flex-col w-full gap-4 mt-8">
            {/* White line on top */}
            <div className="border-t border-white w-full mb-5"></div>

            {data.map((obj, index) => (
        <EventsCategory key={index} data={obj} />
      ))}
           
          </div>

          <p className="text-white/50 mt-8 text-sm"></p>

          <div className="border-t border-white w-full mb-5"></div>

          <div className="flex flex-col w-full mt-8"> <MostLikedArtist /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePageHistory;