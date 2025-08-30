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
import { setShow } from "../app/showSlice";
import { getShowDetails } from "../services/showService";

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

        if (showRes && showRes.status) {
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

    const fetchMovieData = async () => {
      if (tool) return; // skip for series
      try {
        setLoading(true);
        const movieRes = await getShowDetails(movieId);
        if (movieRes && movieRes.status) {
          dispatch(setShow(movieRes.data));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
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
