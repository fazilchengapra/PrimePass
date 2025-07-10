import * as Toggle from "@radix-ui/react-toggle";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

const TheaterFilter = () => {
  const [activeFilters, setActiveFilters] = useState({});

  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filterOptions = [
    { key: "wheelchair", label: "Wheelchair Accessible" },
    { key: "midnight", label: "Midnight" },
    { key: "recliner", label: "Recliner Seats" },
    { key: "ac", label: "AC Theater" },
  ];

  return (
    <div className="flex lg:flex-wrap flex-nowrap w-full scrollbar-hide gap-2 mt-5 overflow-x-auto scrollbar-hide">
      {filterOptions.map(({ key, label }) => (
        <Toggle.Root
          key={key}
          pressed={!!activeFilters[key]}
          onPressedChange={() => toggleFilter(key)}
          className="bg-white whitespace-nowrap flex items-center gap-2 hover:bg-gray-100 border border-gray-300 px-2 py-2 rounded-md text-xs data-[state=on]:bg-slate-200 data-[state=on]:border-black"
          aria-label={label}
        >
          {label}
          {activeFilters[key] && <IoIosClose size={16} />}
        </Toggle.Root>
      ))}
    </div>
  );
};

export default TheaterFilter;
