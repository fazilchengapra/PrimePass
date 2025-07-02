import { Box, Inset, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../api/movie";

const Recommended = () => {
  // Example rating per movie card, use state to manage it per movie
  const [rating, setRating] = useState(5);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const popularMoviesList = async () => {
      try {
        const res = await getPopularMovies();
        setPopularMovies(res.results.slice(0, 6));
      } catch (error) {
        console.log("Error fetching popular movies:", error);
      }
    };
    popularMoviesList();
  }, []);

  console.log("Popular Movies:", popularMovies);
  

  return (
    <div className="mt-4 px-10 mx-5 rounded-md h-fit shadow-md bg-white mb-20">
      <div className="text-xl font-bold text-start pt-5">
        Recommended Movies
      </div>
      <div className="grid grid-cols-6 mt-3">
        {popularMovies.map((movie) => (
          <Box className="mb-5" key={movie.id}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                className="rounded-2xl w-44"
                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt="Bold typography"
                style={{
                  display: "block",
                  objectFit: "cover",
                  backgroundColor: "var(--gray-5)",
                }}
              />
            </Inset>
            <div className="flex flex-col gap-2 mt-3 w-5/6">
              <Text size="2" className="text-start font-semibold">
                {movie.original_title}
              </Text>
              <Text size="1" className="text-start text-[#636363]">
                example movie description goes here. It can be a brief overview of the movie's plot or theme.
              </Text>

              {/* ⭐ Star Rating Section */}
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl cursor-pointer transition ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
