import { useParams } from "react-router-dom";

import MovieHeader from "../components/MovieHeader";
import { Separator } from "@radix-ui/themes";
import ShowDates from "../components/ShowDates";
import TheaterFilter from "../components/TheaterFilter";
import Theater from "../components/Theater";
import OTTproviders from "../components/OTTproviders";
import { useEffect, useState } from "react";
import { getProviders } from "../api/movie";

const MovieDetails = () => {
  const movieId = useParams().movieId;
  const [providers, setProviders] = useState({});
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders(movieId);
        setProviders(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProviders();
  }, [movieId]);

  return (
    <div className="w-[90%] lg:w-2/3 mx-auto mt-1 rounded-md bg-white shadow-sm">
      <div className="w-full p-4">
        <MovieHeader movieId={movieId} />
        <Separator my="3" size="4" />
        {providers ? (
          <OTTproviders flatrate={providers?.flatrate} rent={providers?.rent} buy={providers?.buy} link={providers?.link}/>
        ) : (
          <div>
            <ShowDates />
            <TheaterFilter />
            <Separator my="4" size="4" />
            <Theater />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
