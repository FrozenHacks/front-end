import { FC, useRef, useState, useCallback } from "react";
import { BiSort } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { NavigateFunction, useNavigate } from "react-router-dom";
import GridComponent from "./GridComponent";

const MobileLayout: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [active, setActive] = useState<"sort" | "filter" | null>(null);

  //  ! REPLACE WITH BACKEND DATA

  const categories = useRef([
    "All",
    "Music",
    "Tech",
    "Travel Adventure",
    "Comedy",
    "Theatre",
    "UX Workshops",
    "Photography",
    "Fashion",
  ]);
  const priceFilters = useRef([
    {
      id: "less-500",
      desc: "< than 500",
    },
    {
      id: "500-2000",
      desc: "500 to 2000",
    },
    {
      id: "2000-5000",
      desc: "2000 than 5000",
    },
    {
      id: "more-5000",
      desc: "> than 5000",
    },
  ]);
  const tempArtists = useRef([
    {
      name: "Arijit Singh",
      img: "/madison.jpeg",
      selected: false,
    },
    {
      name: "AR Rehman",
      img: "/madison1.jpg",
      selected: false,
    },
    {
      name: "Post Malone",
      selected: false,
      img: "/madison2.jpg",
    },
    {
      name: "The Weeknd",
      selected: false,
      img: "/madison3.jpg",
    },
    {
      name: "Rosaria",
      selected: false,
      img: "/madisonp.jpg",
    },
    {
      name: "Ariana Grande",
      selected: false,
      img: "/madisonp5.jpg",
    },
    {
      name: "Madison Beer",
      selected: false,
      img: "/madisonp6.jpg",
    },
  ]);
  const handleBackClick = useCallback(() => navigate(-1), [navigate]);

  const handleSortToggle = useCallback(() => {
    setActive((prev) => (prev === "sort" ? null : "sort"));
  }, []);

  const handleFilterToggle = useCallback(() => {
    setActive((prev) => (prev === "filter" ? null : "filter"));
  }, []);

  return (
    <>
      <div className="fixed top-0 w-screen bg-white">
        <div className="flex items-center ml-6 h-[6vh]">
          <span className="mr-10">
            <IoMdArrowBack onClick={handleBackClick} />
          </span>
          <div>Events</div>
        </div>
      </div>

      <div className=" fixed bottom-0 left-0 flex items-center justify-around w-screen bg-white">
        <button
          className="w-full  h-[8vh] gap-2 border flex items-center justify-center border-gray-300"
          onClick={handleSortToggle}
        >
          <BiSort />
          Sort
        </button>
        <button
          className="w-full h-[8vh] gap-2 border flex items-center justify-center border-gray-300"
          onClick={handleFilterToggle}
        >
          <MdFilterList />
          Filter
        </button>
      </div>

      {active === "sort" && (
        <div className="sticky bottom-[8vh] w-full bg-white shadow-lg">
          <div className="text-1xl mt-4 ml-4 font-bold">SORT BY</div>
          <div className="w-full mt-2 border-t"></div>
          <div className="flex flex-col mt-1">
            <button className="hover:bg-gray-100 flex items-center gap-2 px-4 py-2 text-base font-light tracking-wide">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="SortModalIcon"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h24v24H0z" opacity="0.05"></path>
                  <path
                    d="M4 6.136h4.637v2.272H4.472l-.351 1.135h4.45a2.855 2.855 0 01-.772 1.44c-.51.514-1.177.81-1.888.836H5.91l-1.272-.002c-.25-.001-.377.305-.2.484l6.276 6.338 1.586-.002-5.706-5.76a3.92 3.92 0 002-1.092 3.984 3.984 0 001.119-2.242h2.311l.352-1.135H9.76V6.136h3.267V5H4v1.136zm12.626.733l1.249 1.265h-1.25V6.869zm-1.09-1.333v8.35c0 .3.232.557.548.557a.534.534 0 00.542-.547V9.184h2.414a.586.586 0 00.537-.143.53.53 0 00-.001-.773L16.48 5.161a.585.585 0 00-.62-.12.508.508 0 00-.326.495z"
                    fill="#282C3F"
                  ></path>
                </g>
              </svg>
              Price: High to Low
            </button>
            <button className="hover:bg-gray-100 flex items-center gap-2 px-4 py-2 text-base font-light tracking-wide">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="SortModalIcon"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h24v24H0z" opacity="0.05"></path>
                  <path
                    d="M4 6.136h4.637v2.272H4.472l-.351 1.135h4.45a2.855 2.855 0 01-.772 1.44c-.51.514-1.177.81-1.888.836H5.91l-1.272-.002c-.25-.001-.377.305-.2.484l6.276 6.338 1.586-.002-5.706-5.76a3.92 3.92 0 002-1.092 3.984 3.984 0 001.119-2.242h2.311l.352-1.135H9.76V6.136h3.267V5H4v1.136zm12.626.733l1.249 1.265h-1.25V6.869zm-1.09-1.333v8.35c0 .3.232.557.548.557a.534.534 0 00.542-.547V9.184h2.414a.586.586 0 00.537-.143.53.53 0 00-.001-.773L16.48 5.161a.585.585 0 00-.62-.12.508.508 0 00-.326.495z"
                    fill="#282C3F"
                  ></path>
                </g>
              </svg>
              Price: Low to High
            </button>
          </div>
        </div>
      )}

      {active === "filter" && (
        <div className="fixed bottom-0 h-[75vh] w-screen overflow-auto text-black bg-white">
          <div className="text-1xl mt-4 ml-4 font-bold">FILTERS</div>
          <div className="border-t-white w-full pb-4 bg-white border"></div>
          <div className="ml-4">
            <div className="min-h-[40vh]">
              <GridComponent
                categories={categories.current}
                priceFilters={priceFilters.current}
                artists={tempArtists.current}
              />
            </div>
            <div className="flex justify-around my-4">
              <button
                className="border-black/70 px-4 py-1 border rounded"
                onClick={handleFilterToggle}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-[#8560bc] text-white rounded"
                onClick={handleFilterToggle}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileLayout;
