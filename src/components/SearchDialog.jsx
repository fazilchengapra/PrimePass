import { Dialog } from "radix-ui";
import { Flex, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import DialogMovieSuggestion from "./DialogMovieSuggestion";
import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movie";
import SearchTools from "./SearchTools";
import { getSeriesByQuery } from "../api/series";

const SearchDialog = ({
  trigger,
  contentClass = "w-1/2",
  dialogClass = "",
}) => {
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!query || query.trim() === "") {
      setSearchMovies([]);
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
  }, [query, filter]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="!w-full select-none" asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      <Dialog.Content
        className={`bg-white p-6 rounded-lg shadow-xl fixed lg:top-[16rem] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${contentClass} ${dialogClass}`}
      >
        <Dialog.Title className="hidden">Search Movies</Dialog.Title>
        <Dialog.Description className="hidden">
          Search and explore movies here.
        </Dialog.Description>

        <Flex direction="column" gap="3" className="mb-2">
          <TextField.Root
          placeholder={filter ? 'Search '+filter : 'Search movies'}
            className="w-full"
            onChange={(e) => setQuery(e?.target?.value)}
            value={query}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon className="h-6" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {/* Tools */}
        <SearchTools filter={filter} setFilter={setFilter} />
        <div className="overflow-y-auto h-96">
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
