import { useSelector } from "react-redux";
import BrowseCategoriesCards from "./BrowseCategoriesCards";
import { RootState } from "../../types/Slices";

const BrowseCategories = () => {
  const data = useSelector(
    (state: RootState) => state.EventSlice.value.categories
  );

  return (
    <div className="h-fit z-40 flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm tracking-[5%] sm:text-xl text-white">
          Browse by Categories
        </span>
        {/* <button className="text-[8px] tracking-[5%] sm:text-sm text-white/70">
          View All
        </button> */}
      </div>

      <div className="flex items-center justify-between flex-shrink-0 w-full gap-5 mt-10 overflow-y-scroll">
        {data.map((obj, index) => (
          <BrowseCategoriesCards key={index} data={obj} />
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
