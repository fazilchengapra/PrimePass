import { useParams } from "react-router-dom";

import MovieHeader from "../components/MovieHeader";
import { Separator } from "@radix-ui/themes";
import ShowDates from "../components/ShowDates";
import TheaterFilter from "../components/TheaterFilter";
import Theater from "../components/Theater";
import OTTproviders from "../components/OTTproviders";
import { useEffect, useState } from "react";
import { getProviders } from "../api/movie";
import { Riple } from "react-loading-indicators";
import { useSelector } from "react-redux";
import SeriesSection from "../components/SeriesSection";

const MovieDetails = () => {
  const movieId = useParams().movieId;
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(false);
  const tool = useSelector((state) => state?.tool?.tool); // get user selected tool ex: null -> movie, series

  useEffect(() => {
    if (!tool) {
      setLoading(true);
      const fetchProviders = async () => {
        try {
          const res = await getProviders(movieId);
          setProviders(res);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      fetchProviders();
    }
  }, [tool, movieId]);

  return (
    <div className="w-[90%] lg:w-2/3 mx-auto mt-1 rounded-md bg-white shadow-sm min-h-[45rem]">
      {loading ? (
        <div className="flex w-fit m-auto pt-28">
          <Riple color="#000" size="medium" />
        </div>
      ) : (
        <div className="w-full p-4">
          <MovieHeader movieId={movieId} />
          <Separator my="3" size="4" />
          {tool ? ( // now tools are two options movie and series so (tool ? series : movie)
            <SeriesSection /> //if tool include a value render SeriesSection component!
          ) : (
            <div>
              {providers ? ( // otherwise run movie related details (ott providers and theater based details)
                <OTTproviders
                  flatrate={providers?.flatrate}
                  rent={providers?.rent}
                  buy={providers?.buy}
                  link={providers?.link}
                />
              ) : (
                <div>
                  <ShowDates />
                  <TheaterFilter />
                  <Separator my="4" size="4" />
                  <Theater />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
