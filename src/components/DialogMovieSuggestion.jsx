import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../api/movie";
import { Link } from "react-router-dom";
import { Dialog } from "@radix-ui/themes";
import EmptyState from "./ui/EmptyState";

const DialogMovieSuggestion = ({ query, moviesData, filter }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const res = await getNowPlayingMovies();
      setMovies(res);
    };
    getMovies();
  }, []);

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
          <span>Suggested Movies</span>
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
        {(query ? moviesData : movies).map((movie) => (
          <Link to={`movie/${movie?.id}`} key={movie?.id}>
            <Dialog.Close>
              <div
                key={movie.id}
                className="flex flex-row w-full gap-2 lg:gap-4 items-center"
              >
                <div className="w-3/12 lg:w-2/12">
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${movie?.poster_path}`}
                    className="w-full h-auto rounded-md object-contain"
                    alt={movie?.title || "Movie Poster"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-sm">
                    <span>{movie?.title || movie?.name}</span>
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
        ))}
      </div>
    </div>
  );
};

export default DialogMovieSuggestion;
