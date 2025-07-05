import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../api/movie";
import { formatDuration } from "../utils/formatters";
import TrailerDialog from "./TrailerDialog";
import { Box, Inset, Separator } from "@radix-ui/themes";
import MovieInfo from "./MovieInfo";

const MovieHeader = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [duration, setDuration] = useState();
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
        setDuration(formatDuration(data.runtime));
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };

    const fetchMovieTrailer = async () => {
          try {
            const data = await getMovieTrailer(movieId);
            setTrailer(data);
          } catch (error) {
            console.log("Error fetching movie trailer:", error);
          }
        };

        fetchMovieTrailer();

    fetchMovieDetails();
  }, [movieId]);
  return (
    <div>
      <div className="flex flex-row gap-5 h-fit">
        <div className="h-full">
          <Box className="mb-3 group relative w-fit">
            <Inset clip="padding-box" side="top" pb="current">
              <TrailerDialog movieDetails={movieDetails} trailer={[trailer]} poster={movieDetails?.poster_path}/>
            </Inset>
          </Box>
        </div>

        <div className="flex flex-col gap-4 w-full my-auto text-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-gray-800">
              {movieDetails?.title}
            </h1>
            <div className="flex flex-row gap-2 text-xs text-gray-500">
              <span className="uppercase">
                {movieDetails?.original_language}
              </span>
              <Separator orientation="vertical" />
              {duration && (
                <span>
                  {duration?.hours} hr {duration?.minutes} min
                </span>
              )}
            </div>
          </div>

          <div className="">
            <MovieInfo movieId={movieId} movieDetails={movieDetails}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
