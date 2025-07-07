import { useParams } from "react-router-dom";

import MovieHeader from "../components/MovieHeader";
import { Separator } from "@radix-ui/themes";
import ShowDates from "../components/ShowDates";

const MovieDetails = () => {
  const movieId = useParams().id;

  return (
    <div className="w-[90%] lg:w-2/3 lg:m-auto mt-5 m-auto rounded-md bg-white shadow-sm h-full">
      <div className="w-full p-4">
        <MovieHeader movieId={movieId} />
        <Separator my="3" size="4" />
        <ShowDates />
      </div>
    </div>
  );
};

export default MovieDetails;
