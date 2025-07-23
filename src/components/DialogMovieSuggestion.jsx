import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../api/movie";
import { Link } from "react-router-dom";
import { Dialog } from "@radix-ui/themes";
import EmptyState from "./ui/EmptyState";
import { getAiringTVSeries } from "../api/series";
import { OrbitProgress } from "react-loading-indicators";
import { trimText } from "../utils/trimText";

const DialogMovieSuggestion = ({ query, moviesData, filter }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getShow = async () => {
      const res =
        filter === "series"
          ? await getAiringTVSeries()
          : await getNowPlayingMovies();
      setMovies(res);
      setLoading(false);
    };
    getShow();
  }, [filter]); // Include `filter` as a dependency if it changes

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-56 text-gray-600">
        <OrbitProgress variant="spokes" color="#4b5563" size="small" />
      </div>
    );
  }

  return (
    <div className="mt-5">
      {query ? (
        <div className="text-sm font-bold">
          <span>
            Search by : <span className="text-gray-400">{query}</span>
          </span>
        </div>
      ) : (
        <div className="text-sm font-bold">
          <span className="capitalize">
            Suggested {filter ? filter : "Movies"}
          </span>
        </div>
      )}

      <div className="w-full mt-10">
        {query && moviesData.length <= 0 && (
          <EmptyState
            status={404}
            message={filter ? filter + " Not Found!" : "Movie Not Found!"}
          />
        )}
      </div>
      <div className="mt-3 grid lg:grid-cols-2 lg:gap-4 gap-2">
        {(moviesData.length > 0 ? moviesData : !query ? movies : []).map(
          (movie) => (
            <Link to={`movie/${movie?.id}`} key={movie?.id}>
              <Dialog.Close>
                <div
                  key={movie.id}
                  className="flex flex-row w-full gap-2 lg:gap-4 items-center"
                >
                  <div className="w-3/12 lg:w-2/12">
                    <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-300">
                      <img
                        src={`https://image.tmdb.org/t/p/w154/${movie?.poster_path}`}
                        className="w-full h-full object-cover"
                        alt={movie?.title || "Movie Poster"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-sm">
                      <span>
                        {movie?.title
                          ? trimText(movie?.title, 22)
                          : trimText(movie?.name, 22)}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-500">
                      <span className="capitalize">
                        {filter ? filter : "movie"}
                      </span>
                    </div>
                  </div>
                </div>
              </Dialog.Close>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default DialogMovieSuggestion;
