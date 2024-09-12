import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

//  COMPONENT
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";

//  SLICES
import { toggleCitiesModalState } from "../../slices/AppMechanics";

const CitiesModal = () => {
  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const cityImages = useRef([
    "delhi.png",
    "mumbai.png",
    "chennai.png",
    "bangalore.png",
    "hyderabad.png",
    "kolkata.png",
    "pune.png",
    "kochi.png",
    "jaipur.png",
    "ahmedabad.png",
  ]);

  const getLocation = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
        setCity("Please wait while we get your location...");
      } else throw new Error("Geolocation is not supported by this browser.");
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const success = async (position: any) => {
    const { latitude, longitude } = position.coords;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      const city =
        data.address.city || data.address.town || data.address.village;
      setCity(city);
    } catch (err) {
      //   TBD
    }
  };

  const search = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const resp = await axios({
        method: "GET",
        url: "",
        headers: { city },
      });
      if (resp.status === 0) {
        //  TBD
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-60 absolute m-auto w-[800px] h-fit bg-white z-50 rounded-[20px] flex flex-col items-center px-6 py-6">
      <div className="relative flex items-center justify-center w-full">
        <span className="text-3xl font-medium">Select your city</span>
        <button
          onClick={() => {
            dispatch(toggleCitiesModalState(false));
            setCity("");
          }}
          className="absolute right-0"
        >
          <IoMdClose className="text-lg" />
        </button>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-2 mt-6 px-4 items-center border-[#808080] rounded-md border-[0.5px] w-full py-2 h-[44px]">
          <button onClick={search}>
            <CiSearch className="text-black/50 text-2xl" />
          </button>
          <input
            type="text"
            placeholder="Type to search"
            value={city}
            className="w-full border-none outline-none"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button onClick={getLocation} className="flex items-center gap-2">
          <MdMyLocation className="text-website-purple text-base font-medium" />
          <p className="text-website-purple font-light">Current location</p>
        </button>
      </div>

      <div className="flex flex-col items-start w-full gap-4 mt-8">
        <span className="text-base">Popular Cities</span>
        <div className="grid w-full grid-cols-5 gap-5">
          {cityImages.current.map((img) => {
            return (
              <button
                key={img}
                className="flex flex-col items-center gap-1.5 rounded"
                onClick={() => setCity(img.split(".")[0])}
              >
                <div className="border-[0.5px] border-[#808080]/75 p-1 rounded-lg overflow-hidden">
                  <img
                    src={`/cities/${img}`}
                    alt={img.split(".")[0]}
                    className="w-[120px] h-[100px] object-cover"
                  />
                </div>
                <p className="text-sm font-light capitalize">
                  {img.split(".")[0]}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CitiesModal;
