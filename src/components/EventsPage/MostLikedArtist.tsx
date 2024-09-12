import { useSelector } from "react-redux";

//  COMPONENTS
import ArtistCard from "./ArtistCard";

//  TYPES
import { RootState } from "../../types/Slices";

const MostLikedArtist = () => {
  const artistsArray = useSelector((state: RootState) => state.EventSlice.value.artists);

  return (
    <div className="z-40 flex flex-col w-full h-fit">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img
            src="/icons/Artist.png"
            alt="Art"
            className="object-fit w-3 h-[10] sm:w-[19px] sm:h-[16px]"
          />
          <span className="text-sm text-white sm:text-xl">
            Most Liked Artist
          </span>
        </div>
        {/* <button className="text-[8px] font-light sm:text-sm text-white/70">
          View All
        </button> */}
      </div>
      <div className="flex items-center justify-between w-full gap-5 mt-5 overflow-y-scroll shrink-0 sm:mt-10">

        {artistsArray.map((obj, index) => (
          <ArtistCard key={index} data={obj} />
        ))}
      </div>
    </div>
  );
};

export default MostLikedArtist;
