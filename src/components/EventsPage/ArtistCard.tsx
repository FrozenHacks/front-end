//  TYPES
import { TUser } from "../../types/Slices";

const ArtistCard = ({ data }: { data: TUser }) => {
  const navigateToCat = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      console.log(data.first_name);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <button
      onClick={navigateToCat}
      className="shrink-0 flex flex-col items-center gap-2"
    >
      <img
        src={data?.profile_pic}
        alt="madison"
        className="object-cover bg-center rounded-full w-20  h-20 sm:w-[140px] sm:h-[150px]"
      />
      <p className="font-light text-white text-[8px] sm:text-[12px]">
        {data.first_name + " " + data.last_name}
      </p>
    </button>
  );
};

export default ArtistCard;
