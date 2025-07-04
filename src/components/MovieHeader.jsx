import { Box, Button, Inset, Separator } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/movie";
import { formatDuration } from "../utils/formatters";
import TrailerDialog from "./TrailerDialog";

const MovieHeader = ({movieId}) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [duration, setDuration] = useState();

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

    fetchMovieDetails();
  }, [movieId]);
  return (
    <div>
      <div className="flex flex-row gap-5 h-fit">
        <div className="h-full">
          <Box className="mb-3 group relative w-fit">
            <Inset clip="padding-box" side="top" pb="current">
              <TrailerDialog movieDetails={movieDetails} movieId={movieId}/>
            </Inset>
          </Box>
        </div>

        <div className="flex flex-col gap-4 w-full my-auto text-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-gray-800">
              {movieDetails?.title}
            </h1>
            <div className="flex flex-row gap-2 text-xs text-gray-500">
              <span>UA13+</span>
              <Separator orientation="vertical" />
              <span className="uppercase">
                {movieDetails?.original_language}
              </span>
              <Separator orientation="vertical" />
              <span>
                {duration?.hours} hr {duration?.minutes} min
              </span>
            </div>
          </div>

          <div>
            <Button radius="large" color="gray" variant="outline" highContrast>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
