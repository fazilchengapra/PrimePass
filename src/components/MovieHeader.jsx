import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../api/movie";
import { formatDuration } from "../utils/formatters";
import TrailerDialog from "./TrailerDialog";
import { Box, Inset, Separator } from "@radix-ui/themes";
import MovieInfo from "./MovieInfo";
import MovieCardSkelton from "./Skeletons/MovieCardSkelton";
import { useDispatch, useSelector } from "react-redux";
import { setMovie } from "../app/movieSlice";
import { getTVSeriesById } from "../api/series";

const MovieHeader = ({ movieId }) => {
  const dispatch = useDispatch();
  const [movieDetails, setMovieDetails] = useState(null);
  const [duration, setDuration] = useState();
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState();
  const tool = useSelector(state => state?.tool?.tool)
  
  useEffect(() => {
    setLoading(true);
    const fetchMovieDetails = async () => {
      try {
        const data = tool === 'series' ? await getTVSeriesById(movieId) : await getMovieDetails(movieId);
        setMovieDetails(data);
        setDuration(formatDuration(data.runtime));
      } catch (error) {
        setLoading(false);
        console.log("Error fetching movie details:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const data = await getMovieTrailer(movieId);
        setTrailer(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching movie trailer:", error);
      }
    };

    fetchMovieTrailer();

    fetchMovieDetails();
  }, [movieId, tool]);

  useEffect(() => {
    dispatch(setMovie(movieDetails));
  }, [movieDetails, dispatch]);
  return (
    <div>
      <div className="lg:flex flex-row gap-5 h-fit">
        <div className="h-full w-36 m-auto lg:w-44 lg:m-0">
          <Box className="mb-3 group relative w-fit">
            <Inset clip="padding-box" side="top" pb="current">
              {loading ? (
                <MovieCardSkelton />
              ) : (
                <TrailerDialog
                  movieDetails={movieDetails}
                  trailer={[trailer]}
                  poster={movieDetails?.poster_path}
                />
              )}
            </Inset>
          </Box>
        </div>

        <div className="flex flex-col gap-4 w-full my-auto text-center lg:text-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-gray-800">
              {movieDetails?.title || movieDetails?.name}
            </h1>
            <div className="justify-center lg:justify-start flex flex-row gap-2 text-xs text-gray-500">
              <span className="uppercase">
                {movieDetails?.original_language}
              </span>
              <Separator orientation="vertical" />
              {duration && (
                <span>
                  {duration?.hours} hr {duration?.minutes} min
                </span>
              )}
              {movieDetails?.number_of_seasons && <span>{movieDetails?.number_of_seasons+' Seasons'}</span>}
            </div>
          </div>

          <div className="">
            <MovieInfo movieId={movieId} movieDetails={movieDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
