import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
// import { LuHistory } from "react-icons/lu";
import { toggleSearchBarState } from "../slices/AppMechanics";
import { RootState } from "../types/Slices";
import axios from "axios";
import { setSearchedEvents, setSelectedEvent } from "../slices/EventSlice";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;
  const searchedEvents = useSelector(
    (state: RootState) => state.EventSlice.value.searchedEvents
  );

  const dispatch = useDispatch();
  const searchBarState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSearchBarVisible
  );

  const closeSearchBar = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleSearchBarState(!searchBarState));
    setSearch("");
  };

  useEffect(() => {
    if (search.length >= 3) {
      (async () => {
        try {
          const resp = await axios({
            url: `${BASEURL}/events/search`,
            method: "GET",
            headers: {
              event: search,
            },
          });
          if (resp.status === 200) {
            const data = resp.data;
            console.log("SB", data);
            dispatch(setSearchedEvents(resp.data.events));
          }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      })();
    }
  }, [BASEURL, dispatch, search]);

  const handleEvent = (data: any) => {
    dispatch(setSelectedEvent(data));
    window.sessionStorage.setItem('event',JSON.stringify(data))
  }
  
  return (
    <div className="z-[60] absolute top-10 mx-auto bg-white h-screen overflow-y-scroll flex flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[60%] px-4 sm:px-8 md:px-12 lg:px-20 pt-10 pb-20">
      <div className="h-fit flex items-center justify-between w-full">
        <h3 className="text-website-purple sm:text-2xl text-xl font-medium">
          Search your event
        </h3>
        <button onClick={closeSearchBar} className="w-fit h-fit">
          <IoMdClose className="sm:text-2xl text-xl" />
        </button>
      </div>

      <div className="flex items-center gap-4 w-full h-[44px] flex-shrink-0 px-4 border border-gray-400 mt-8 rounded-lg outline-none border-1">
        <button className="w-fit h-fit">
          <CiSearch className="text-xl" />
        </button>
        <input
          required
          type="text"
          value={search}
          placeholder="Type to search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-base border-none outline-none"
        />
      </div>

      {/* RECENT SEARCH */}
      <div className="flex flex-col w-full mt-10">
        <div className="flex items-center gap-2">
          {/* <LuHistory className="text-website-purple/70 sm:text-xl text-lg" />
          <h4 className="text-website-purple/70 sm:text-xl text-lg">
            Recent Search
          </h4> */}
        </div>
        <div className="flex flex-col gap-0.5 w-full mt-2">
          {searchedEvents.map((obj, index) => (
            <button
              onClick={() => {
                handleEvent(obj)
                navigate("/event/details");
              }}
              key={index}
              className=" flex items-center gap-4 py-2 border-b border-gray-300"
            >
              <img
                src={obj?.images[0]?.img}
                alt={obj.title}
                className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full"
              />
              <p className="sm:text-lg text-base tracking-wide text-gray-600">
                {obj.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* TRENDING */}
      {/* <div className="flex flex-col w-full mt-6">
        <div className="flex items-center gap-2">
          <IoMdTrendingUp className="text-website-purple/70 sm:text-xl text-lg" />
          <h4 className="text-website-purple/70 sm:text-xl text-lg">
            Trending Events
          </h4>
        </div>
        <div className="flex flex-col gap-0.5 w-full mt-2">
          {new Array(4).fill(null).map((_, index) => (
            <div
              key={index}
              className=" flex items-center gap-4 py-2 border-b border-gray-300"
            >
              <img
                src="/madison.jpeg"
                alt="event description" // Improve alt text
                className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full"
              />
              <p className="sm:text-lg text-base tracking-wide text-gray-600">
                Some Event at Chennai
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Searchbar;
