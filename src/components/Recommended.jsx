import {  Text } from "@radix-ui/themes";
import  { useEffect, useState } from "react";
import { getPopularMovies } from "../api/movie";
import Card from "./Card";
import { Link } from "react-router-dom";

const Recommended = () => {
  // Example rating per movie card, use state to manage it per movie
  const [rating, setRating] = useState(5);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const popularMoviesList = async () => {
      try {
        const res = await getPopularMovies();
        setPopularMovies(res.results.slice(0, 6));
      } catch (error) {
        console.log("Error fetching popular movies:", error);
      }
    };
    popularMoviesList();
  }, []);
  

  return (
    <div className="mt-4 px-10 mx-5 rounded-md h-fit shadow-md bg-white">
      <div className="text-xl font-bold text-start pt-5">
        Available on OTT
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 lg:gap-10 mt-3">
        {popularMovies.map((movie) => (
          <div className="w-full" key={movie.id}>
            <Link to={'movie/'+movie.id}><Card key={movie.id} card={movie}/></Link>
            <div className="flex flex-col gap-2 mt-3 w-5/6 lg:block text-start cursor-pointer">
              <Text size="2" className="text-start font-bold lg:font-semibold">
                {movie.original_title}
              </Text>
              <Text
                size="1"
                className="text-start text-[#636363] hidden lg:block"
              >
                example movie description goes here. It can be a brief overview
                of the movie's plot or theme.
              </Text>

              {/* ⭐ Star Rating Section */}
              <div className=" gap-1 mt-1 hidden lg:block mb-0 lg:mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl cursor-pointer transition ${
                        rating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
