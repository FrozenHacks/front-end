import React, { useState, useCallback, useMemo } from "react";
import CalendarModal from "../../Modals/CalenderModal";

export type Artist = {
  name: string;
  img: string;
  selected: boolean;
};

export type PriceFilter = {
  id: string;
  desc: string;
};

export type GridComponentProps = {
  categories: string[];
  priceFilters: PriceFilter[];
  artists: Artist[];
};

const GridComponent: React.FC<GridComponentProps> = ({
  categories,
  priceFilters,
  artists: initialArtists,
}) => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "date" | "priceFilters" | "artists"
  >("categories");
  const [artists, setArtists] = useState(initialArtists);

  // Toggle selection for artists
  const toggleArtistSelection = useCallback((name: string) => {
    setArtists((prevArtists) =>
      prevArtists.map((artist) =>
        artist.name === name
          ? { ...artist, selected: !artist.selected }
          : artist
      )
    );
  }, []);

  // Memoized content rendering to avoid unnecessary re-renders
  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "categories":
        return (
          <ul className="overflow-y-scroll">
            {categories.map((category, index) => (
              <li
                key={index}
                className="p-2 text-left text-gray-700 border-b-[1px] border-gray-300"
              >
                <button className="w-full text-left">{category}</button>
              </li>
            ))}
          </ul>
        );
      case "date":
        return <CalendarModal />;
      case "priceFilters":
        return (
          <ul>
            {priceFilters.map((filter) => (
              <li
                key={filter.id}
                className="p-2 text-left text-gray-700 border-b-[1px] border-gray-300"
              >
                <button className="w-full text-left">{filter.desc}</button>
              </li>
            ))}
          </ul>
        );
      case "artists":
        return (
          <ul className="overflow-y-scroll">
            {artists.map((artist) => (
              <li
                key={artist.name}
                className="p-2 text-left text-gray-700 border-b-[1px] border-gray-300"
              >
                <input
                  type="checkbox"
                  checked={artist.selected}
                  onChange={() => toggleArtistSelection(artist.name)}
                  className="mr-2"
                />
                {artist.name}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  }, [activeTab, categories, priceFilters, artists, toggleArtistSelection]);
  

  return (
    <div className="grid grid-cols-3 gap-3 p-2 h-[60vh] max-h-[60vh] min-h-[60vh]">
      {/* Left Tabs */}
      <div className="col-span-1 flex flex-col p-3 bg-gray-100 rounded-md">
        {["categories", "date", "priceFilters", "artists"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`text-left mb-2 ${
              activeTab === tab ? "font-bold text-website-purple" : ""
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Right Content */}
      <div className="col-span-2 p-4 bg-white rounded-md">{renderContent}</div>
    </div>
  );
};

export default GridComponent;