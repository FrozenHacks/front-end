import { useMemo } from "react";
import { useSelector } from "react-redux";

//  COMPONENTS
import EventsCategory from "../components/EventsPage/EventsCategory";
import BrowseCategories from "../components/EventsPage/BrowseCategories";
import QRCode from "../components/EventsPage/QRCode";
import MostLikedArtist from "../components/EventsPage/MostLikedArtist";

//  TYPES
import { RootState } from "../types/Slices";

const EventsPage = () => {
  const latestEvents = useSelector(
    (state: RootState) => state.EventSlice.value.latestEvents
  );
  const nearByEvents = useSelector(
    (state: RootState) => state.EventSlice.value.nearByEvents
  );
  const upComingEvents = useSelector(
    (state: RootState) => state.EventSlice.value.upComingEvents
  );
  const thisMonthEvents = useSelector(
    (state: RootState) => state.EventSlice.value.thisMonthEvents
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

  const data1 = useMemo(() => {
    return [
      {
        title: "Up Coming Events",
        carousel: upComingEvents,
      },
      {
        title: "This Month Events",
        carousel: thisMonthEvents,
      },
    ];
  }, [upComingEvents, thisMonthEvents]);

  return (
    <div className="flex flex-col items-center justify-center w-screen gap-20 px-4 pt-10 pb-28 bg-website-purple bg-gradient-to-b from-website-purple-dark to-website-purple h-fit sm:px-40 sm:pt-40">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black opacity-40"></div>
      {data.map((obj, index) => (
        <EventsCategory key={index} data={obj} />
      ))}
      <BrowseCategories />
      <QRCode />
      {data1.map((obj, index) => (
        <EventsCategory key={index} data={obj} />
      ))}
      <MostLikedArtist />
    </div>
  );
};

export default EventsPage;
