import React, { useEffect, useState } from "react";
import { fetchMovies, getNowPlayingMovies } from "../api/movie";

const DialogMovieSuggestion = ({ query, moviesData }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const res = await getNowPlayingMovies();
      setMovies(res);
    };
    getMovies();
  }, []);

  console.log(moviesData);

  return (
    <div className="mt-5">
      {query ? <div className="text-sm font-bold">
        <span>Search by : <span className="text-gray-400">{query}</span></span>
      </div> :<div className="text-sm font-bold">
        <span>Suggested Movies</span>
      </div>}
      <div className="mt-3 grid lg:grid-cols-2 lg:gap-4 gap-2">
        {query
          ? moviesData.map((movie) => (
              <div className="flex flex-row w-full gap-2 lg:gap-4 items-center">
                <div className="w-3/12 lg:w-2/12">
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${movie?.poster_path}`}
                    className="w-full h-auto rounded-md object-contain"
                    alt="Movie"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-sm">
                    <span>{movie?.title}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-500">
                    <span>Movie</span>
                  </div>
                </div>
              </div>
            ))
          : movies.map((movie) => (
              <div className="flex flex-row w-full gap-2 lg:gap-4 items-center">
                <div className="w-3/12 lg:w-2/12">
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${movie?.poster_path}`}
                    className="w-full h-auto rounded-md object-contain"
                    alt="Movie"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-sm">
                    <span>{movie?.title}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-500">
                    <span>Movie</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DialogMovieSuggestion;
