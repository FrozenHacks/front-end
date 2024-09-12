import axios from "axios";
import { format } from "date-fns";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//  COMPONENTS
import { MdOutlineDateRange } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
// import { MdOutlineDateRange, MdGroups } from "react-icons/md";
// import { IoIosPricetag } from "react-icons/io";

//  TYPES
import { RootState } from "../../types/Slices";
import { setSearchedEvents } from "../../slices/EventSlice";

// Define types based on react-calendar documentation
type CalendarValue = Date | [Date, Date] | null;

const FiltersComponent = () => {
  const dispatch = useDispatch();
  const [pageRendered, setPageRendered] = useState(false);

  const categories = useSelector(
    (state: RootState) => state.EventSlice.value.categories
  );
  // const artists = useSelector(
  //   (state: RootState) => state.EventSlice.value.artists
  // );
  // const priceFilters = [
  //   { id: "less-500", desc: "< 500" },
  //   { id: "500-2000", desc: "500 to 2000" },
  //   { id: "2000-5000", desc: "2000 to 5000" },
  //   { id: "more-5000", desc: "> 5000" },
  // ];

  // const [price, setPrice] = useState<string | null>(null);
  // const [artist, setArtist] = useState<string[]>([]);
  const [value, setValue] = useState<CalendarValue>(null);
  const [category, setCategory] = useState<string>("");
  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const filterEvents = async () => {
      try {
        const formattedDate = value
          ? Array.isArray(value)
            ? `${format(value[0], "yyyy-MM-dd")}`
            : `${format(value, "yyyy-MM-dd")}`
          : "";
        const resp = await axios.get(`${BASEURL}/events/filtered`, {
          headers: {
            category,
            eventdate: formattedDate ? formattedDate : "",
            // price,
            // artists: JSON.stringify(artist),
          },
        });
        if (resp.status === 200) {
          dispatch(setSearchedEvents(resp.data));
          console.log(resp.data);
          setPageRendered(true);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (value || category) filterEvents();
    if (!pageRendered) filterEvents();
  }, [value, BASEURL, dispatch, category, pageRendered]);

  const handleDateChange = (newValue: CalendarValue) => {
    setValue(newValue);
  };

  return (
    <div className="z-20 mt-5 shrink-0 h-fit w-full sm:w-[300px] md:w-[320px] lg:w-[350px] xl:w-[380px] flex flex-col p-4 sm:p-6 md:p-8 bg-white/10 rounded-lg">
      <h4 className="sm:text-white text-2xl tracking-wide text-black">
        Filters
      </h4>

      {/* Category */}
      <div className="flex items-center gap-2 mt-4">
        <BiSolidCategory className="sm:text-white text-xl text-black" />
        <h4 className="sm:text-white text-xl tracking-wide text-black">
          Category
        </h4>
      </div>
      <div className="h-fit flex flex-wrap w-full gap-3 mt-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.name)}
            className={`${
              category === cat.name
                ? "text-website-purple bg-white"
                : "text-black sm:text-white/90"
            } shrink-0 px-3 py-1 text-center text-sm border-[0.5px] border-white/40 rounded`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="h-fit flex flex-col items-start w-full mt-8">
        <div className="flex items-center gap-2">
          <MdOutlineDateRange className="sm:text-white text-xl text-black" />
          <h4 className="sm:text-white text-xl tracking-wide text-black">
            Date
          </h4>
        </div>
        <div className="h-fit w-full mt-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <Calendar value={value} onChange={handleDateChange} />
        </div>
      </div>

      {/* Price */}
      {/* <div className="h-fit flex flex-col items-start w-full mt-8">
        <div className="flex items-center gap-2">
          <IoIosPricetag className="sm:text-white text-xl text-black" />
          <h4 className="sm:text-white text-xl tracking-wide text-black">
            Price
          </h4>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {priceFilters.map((obj) => (
            <div key={obj.id} className="flex items-center gap-4">
              <input
                id={obj.id}
                type="checkbox"
                name={obj.id}
                checked={price === obj.desc}
                onChange={() => {
                  setPrice(price === obj.desc ? null : obj.desc); // Toggle selection
                }}
                className="outline-none"
              />
              <label
                htmlFor={obj.id}
                className="text-black/70 sm:text-white/70 text-base font-light tracking-wide"
              >
                {obj.desc}
              </label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Artists */}
      {/* <div className="h-fit flex flex-col items-start w-full mt-8">
        <div className="flex items-center gap-2">
          <MdGroups className="sm:text-white text-2xl text-black" />
          <h4 className="sm:text-white text-xl tracking-wide text-black">
            Artists
          </h4>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {artists.map((obj) => (
            <div key={obj._id} className="flex items-center gap-4">
              <input
                id={`${obj.first_name}-${obj.last_name}`}
                type="checkbox"
                name={`${obj.first_name}-${obj.last_name}`}
                checked={artist.includes(`${obj.first_name} ${obj.last_name}`)}
                onChange={() => {
                  setArtist((prev) =>
                    prev.includes(`${obj.first_name} ${obj.last_name}`)
                      ? prev.filter(
                          (a) => a !== `${obj.first_name} ${obj.last_name}`
                        )
                      : [...prev, `${obj.first_name} ${obj.last_name}`]
                  );
                }}
              />
              <div className="flex items-center gap-2">
                <img
                  src={obj.profile_pic}
                  alt={`${obj.first_name} ${obj.last_name}`}
                  className="object-cover rounded-full w-[36px] h-[36px]"
                />
                <label
                  htmlFor={`${obj.first_name}-${obj.last_name}`}
                  className="text-black/70 sm:text-white/70 text-base font-light tracking-wide"
                >
                  {`${obj.first_name} ${obj.last_name}`}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FiltersComponent;
