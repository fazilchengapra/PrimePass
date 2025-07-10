import { useParams } from "react-router-dom";

import MovieHeader from "../components/MovieHeader";
import { Separator } from "@radix-ui/themes";
import ShowDates from "../components/ShowDates";
import TheaterFilter from "../components/TheaterFilter";
import Theater from "../components/Theater";

const MovieDetails = () => {
  const movieId = useParams().id;

  return (
    <div className="w-[90%] lg:w-2/3 mx-auto mt-1 rounded-md bg-white shadow-sm">
      <div className="w-full p-4">
        <MovieHeader movieId={movieId} />
        <Separator my="3" size="4" />
        <ShowDates />
        <TheaterFilter />
        <Separator my="4" size="4" />
        <Theater />
      </div>
    </div>
  );
};

export default MovieDetails;
