import { Button, IconButton } from "@radix-ui/themes";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import YearFilter from "./filters/YearFilter";
import LanguageFilter from "./filters/LanguageFilter";
import GenreFilter from "./filters/GenreFilter";
import { BookmarkIcon } from "@radix-ui/react-icons";

const filters = [
  { name: "Year", movie: "year", tv: "first_air_date_year" },
  {
    name: "Language",
    movie: "with_original_language",
    tv: "with_original_language",
  },
  { name: "Genre", movie: "with_genres", tv: "with_genres" },
];

const FilterBody = () => {
  const [filterSelector, setFilterSelector] = useState("Year");
  const [filterOptions, setFilterOptions] = useState({
    year: null,
    with_original_language: null,
    with_genres: [],
  });

  console.log(filterOptions);

  return (
    <div className="w-full flex lg:flex-none flex-col gap-5">
      <div className=" lg:hidden w-fit m-auto p-3 rounded-full hover:bg-gray-100">
        <div className="h-1 w-10 bg-gray-400 rounded-full"></div>
      </div>
      <div className="px-4 flex flex-col gap-3">
        {/* Header with Close Button */}
        <div className="flex flex-row justify-between items-center w-full">
          <div className="text-lg">
            <h3 className="font-bold text-black">Filter By</h3>
          </div>
          <Dialog.Close asChild>
            <IconButton className="p-2 rounded-full bg-gray-200">
              <IoMdClose size={20} />
            </IconButton>
          </Dialog.Close>
        </div>

        {/* Filter Body Content */}
        <div className="w-full">
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-2 flex flex-col gap-3 p-1 border-r-2 border-gray-400">
              {filters.map((filter) => (
                <div
                  className={`w-full p-3 rounded-lg border-none shadow-none ${
                    filter.name === filterSelector
                      ? "bg-blue-500 text-white"
                      : "bg-transparent text-black"
                  }`}
                  onClick={() => setFilterSelector(filter.name)}
                >
                  <span className="font-bold lg:font-semibold text-xs lg:text-sm">
                    {filter.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="col-span-4 w-full flex items-center">
              {filterSelector === "Year" && (
                <YearFilter
                filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                />
              )}
              {filterSelector === "Language" && (
                <LanguageFilter
                filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                />
              )}
              {filterSelector === "Genre" && (
                <GenreFilter
                  filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                />
              )}
            </div>
          </div>
          {/* Save and Clear All Button */}
          <div className="grid grid-cols-3 mt-5 gap-3">
            <div className="col-span-1">
              <Button
                color="gray"
                variant="outline"
                className="w-full py-1 rounded-full"
                highContrast
              >
                Clear Filter
              </Button>
            </div>
            <div className="col-span-2">
              <Button className="rounded-md w-full py-1" color="indigo">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBody;
