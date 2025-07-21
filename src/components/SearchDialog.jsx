import { Dialog } from "radix-ui";
import { Flex, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import DialogMovieSuggestion from "./DialogMovieSuggestion";
import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movie";
import SearchTools from "./SearchTools";
import { getSeriesByQuery } from "../api/series";
import FilterOptions from "./FilterOptions";
import { fetchFilteredMovies } from "../api/discover";
import { hasAnyFilterValue } from "../utils/filterHelpers";

const SearchDialog = ({
  trigger,
  contentClass = "w-1/2",
  dialogClass = "",
}) => {
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [filter, setFilter] = useState("");

  // filter options
  const [filterOptions, setFilterOptions] = useState({
    year: null,
    with_original_language: null,
    with_genres: [],
  });

  useEffect(() => {
    if (!query || query?.trim() === "") {
      const isSelected = hasAnyFilterValue(filterOptions);
      if (isSelected) {
        (async () => {
          const res = await fetchFilteredMovies(filterOptions, filter);
          setSearchMovies(res);
        })();
      } else {
        setSearchMovies([]);
      }
      return;
    }
    const fetchMoviesByQuery = async () => {
      const res =
        filter === "series"
          ? await getSeriesByQuery(query)
          : await fetchMovies(query);
      setSearchMovies(res);
    };

    fetchMoviesByQuery();
  }, [query, filter, filterOptions]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="!w-full select-none" asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      <Dialog.Content
        className={`bg-white p-6 rounded-lg shadow-xl fixed lg:top-[18rem] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${contentClass} ${dialogClass}`}
      >
        <Dialog.Title className="hidden">Search Movies</Dialog.Title>
        <Dialog.Description className="hidden">
          Search and explore movies here.
        </Dialog.Description>

        <Flex direction="column" gap="3" className="mb-2">
          <TextField.Root
            placeholder={filter ? "Search " + filter : "Search movies"}
            className="w-full"
            onChange={(e) => setQuery(e?.target?.value)}
            value={query}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon className="h-6" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {/* Searching Features */}
        <div className="flex flex-row justify-between items-center">
          {/* Tools filtering */}
          <SearchTools filter={filter} setFilter={setFilter} />

          {/* Filter by Multiple options */}
          <FilterOptions
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>

        <div className="overflow-y-auto h-96 suggestion-list">
          <div className="text-start">
            <DialogMovieSuggestion
              query={query}
              moviesData={searchMovies}
              filter={filter}
            />
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SearchDialog;
