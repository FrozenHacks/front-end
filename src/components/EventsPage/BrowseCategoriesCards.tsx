//  TYPES
import { TBrowseCategoriesCards } from "../../types/Components";

const BrowseCategoriesCards = ({ data }: TBrowseCategoriesCards) => {
  const navigateToCat = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      console.log(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={navigateToCat}
      className="flex flex-col items-center flex-shrink-0 gap-2"
    >
      <img
        src={data?.img}
        alt="madison"
        className="object-cover bg-center rounded w-20  h-20 sm:w-[140px] sm:h-[150px]"
      />
      <p className="text-white tracking-[7%] text-[10px] sm:text-[12px]">
        {data.name}
      </p>
    </button>
  );
};

export default BrowseCategoriesCards;
