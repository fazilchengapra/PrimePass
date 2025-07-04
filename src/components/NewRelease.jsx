import { useEffect, useState } from "react";
import { upcomingMovies } from "../api/movie";
import Card from "./Card";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const NewRelease = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchNewRelease = async () => {
      try {
        const data = await upcomingMovies();
        setMovie(data.results.slice(0, 12));
      } catch (error) {
        console.error(
          "❌ Error fetching new release movies:",
          error.response?.data || error.message
        );
      }
    };
    fetchNewRelease();
  }, []);

  return (
    <div className="mt-4 px-4 md:px-10 mx-5 rounded-md h-fit shadow-md bg-white mb-20">
      <div className="text-xl font-bold text-start pt-5 pb-3">
        Upcoming Movies
      </div>

      {/* 🔄 Scrollable container on small devices */}
      <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:gap-10 no-scrollbar">
        {movie.map((m) => (
          <div key={m.id} className="group">
            <Link to={'movie/'+m.id}><Card key={m.id} card={m} /></Link>
            <div className="mt-2 lg:mr-10 w-fit lg:w-44">
              <Button className="w-44" color="indigo" variant="soft">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
