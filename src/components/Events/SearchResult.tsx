import { useSelector } from "react-redux";
import { useMemo } from "react";

//  COMPONENTS
import EventsCard from "../EventsPage/EventsCard";

//  TYPES
import { RootState } from "../../types/Slices";

const SearchResult = () => {
  const events = useSelector(
    (state: RootState) => state.EventSlice.value.searchedEvents
  );

  const cards = useMemo(
    () => events.map((obj, index) => <EventsCard key={index} data={obj} />),
    [events]
  );

  return (
    <div className="h-fit z-10 flex flex-col w-full mt-5">
      <h2 className="text-2xl text-white">Events in Singapore</h2>
      <div className="sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid w-full grid-cols-1 gap-5 mt-4">
        {cards}
      </div>
    </div>
  );
};

export default SearchResult;
