import { useParams } from "react-router-dom";

import MovieHeader from "../components/MovieHeader";
import { Separator } from "@radix-ui/themes";

const MovieDetails = () => {
  const movieId = useParams().id;

  return (
    <div className="w-2/3 m-auto mt-5 rounded-md bg-white shadow-sm h-full">
      <div className="w-full p-4">
        <MovieHeader movieId={movieId}/>
        <Separator my="3" size="4" />
      </div>
    </div>
  );
};

export default MovieDetails;
