import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import MovieHeader from "../components/MovieHeader";
import ShowDates from "../components/ShowDates";
import TheaterFilter from "../components/TheaterFilter";
import Theater from "../components/Theater";
import OTTproviders from "../components/OTTproviders";
import SeriesSection from "../components/SeriesSection";
import { Separator } from "@radix-ui/themes";
import { Riple } from "react-loading-indicators";

import { getProviders } from "../api/movie";
import { getShowDetails } from "../api/getShowDetails";
import { setShow } from "../app/showSlice";

const MovieDetails = () => {
  const { movieId } = useParams();
  const tool = useSelector((state) => state?.tool?.tool); // null → movie, value → series
  const dispatch = useDispatch();

  const [data, setData] = useState({
    providers: null,
    showDetails: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tool) return; // skip for series

    const fetchData = async () => {
      setLoading(true);
      try {
        const [providersRes, showRes] = await Promise.all([
          getProviders(movieId),
          getShowDetails(movieId),
        ]);

        setData({ providers: providersRes, showDetails: showRes });

        // ✅ toast only once, immediately after fetch
        if (showRes && !showRes.status) {
          toast.error("Show not found", { toastId: "showNotFound" });
        }
        if (showRes && showRes.status) {
          console.log(showRes);

          dispatch(setShow(showRes.data));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast.error("Something went wrong while fetching details.", {
          toastId: "fetchError",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tool, movieId, dispatch]);

  if (loading) {
    return (
      <div className="flex w-fit m-auto pt-28">
        <Riple color="#000" size="medium" />
      </div>
    );
  }

  return (
    <div className="w-[90%] lg:w-2/3 mx-auto mt-1 rounded-md bg-white shadow-sm min-h-[45rem]">
      <div className="w-full p-4">
        <MovieHeader movieId={movieId} />
        <Separator my="3" size="4" />

        {tool ? (
          <SeriesSection />
        ) : data.providers ? (
          <OTTproviders
            flatrate={data.providers?.flatrate}
            rent={data.providers?.rent}
            buy={data.providers?.buy}
            link={data.providers?.link}
          />
        ) : data.showDetails?.status ? (
          <>
            <ShowDates dates={data.showDetails.data.dates} />
            <TheaterFilter />
            <Separator my="4" size="4" />
            <Theater shows={data.showDetails.data.theaters} />
          </>
        ) : (
          <div className="flex justify-center text-center font-semibold text-sm text-red-700">
            No show details available for this movie.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
