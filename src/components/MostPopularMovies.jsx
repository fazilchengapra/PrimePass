import React, { useEffect, useState, useRef } from "react";
import { getAllTimePopularMovies } from "../api/movie";
import MovieCardSkelton from "./Skeletons/MovieCardSkelton";
import { Link } from "react-router-dom";
import Card from "./Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconButton } from "@radix-ui/themes";

const MostPopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const res = await getAllTimePopularMovies();
        setPopularMovies(res);
        setLoading(false);
      } catch (error) {
        console.error("Popular movies fetching Error:", error);
        setLoading(false);
      }
    };
    fetchMovieData();
  }, []);

  // Handle responsive scroll
  const scrollLeft = () => {
    const isMobile = window.innerWidth < 1024;
    const scrollAmount = isMobile ? 220 : scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    
  };

  const scrollRight = () => {
    const isMobile = window.innerWidth < 1024;
    const scrollAmount = isMobile ? 220 : scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="mt-4 px-4 md:px-10 mx-5 rounded-md h-fit shadow-md bg-white">
      <div className="text-xl font-bold text-start pt-5 pb-3">
        Popular Movies
      </div>

      {/* Arrow + Scroll Wrapper */}
      <div className="relative">
        {/* Arrows */}
        <IconButton
          color="gray"
          variant="solid"
          highContrast
          onClick={scrollLeft}
          className="absolute left-0 top-[45%] -translate-y-1/2 z-10 shadow-lg p-2 rounded-full"
        >
          <IoIosArrowBack size={24} />
        </IconButton>

        <IconButton
          color="gray"
          variant="solid"
          highContrast
          onClick={scrollRight}
          className="absolute right-0 top-[45%] -translate-y-1/2 z-10 shadow-lg p-2 rounded-full"
        >
          <IoIosArrowForward size={24} />
        </IconButton>

        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth suggestion-list px-8 pb-6"
        >
          {(loading ? [...Array(8)] : popularMovies)?.map((m, index) => (
            <div
              key={m?.id || index}
              className="min-w-[200px] w-[200px] lg:w-[250px] flex-shrink-0"
            >
              {loading ? (
                <MovieCardSkelton />
              ) : (
                <Link to={"movie/" + m.id}>
                  <Card card={m} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fallback if no data */}
      {!loading && popularMovies?.length === 0 && (
        <div className="text-center w-full text-gray-500 mt-4">
          No popular movies found.
        </div>
      )}
    </div>
  );
};

export default MostPopularMovies;
