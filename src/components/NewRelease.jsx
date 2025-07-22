import { useEffect, useState } from "react";
import { upcomingMovies } from "../api/movie";
import Card from "./Card";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import MovieCardSkelton from "./Skeletons/MovieCardSkelton";

const NewRelease = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchNewRelease = async () => {
      try {
        const data = await upcomingMovies();
        setMovie(data.slice(0, 12));
        setLoading(false);
      } catch (error) {
        console.error(
          "❌ Error fetching new release movies:",
          error.response?.data || error.message
        );
        setLoading(false);
      }
    };
    fetchNewRelease();
  }, []);

  return (
    <div className="mt-4 px-4 md:px-10 mx-5 rounded-md h-fit shadow-md bg-white">
      <div className="text-xl font-bold text-start pt-5 pb-3">
        Upcoming Movies
      </div>

      {/* 🔄 Scrollable container on small devices */}
      <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:gap-10 suggestion-list">
        {loading
          ? [...Array(12)].map((_, index) => <MovieCardSkelton key={index} />)
          : movie.map((m) => (
              <div key={m.id} className="h-full group flex flex-col justify-end">
                <Link to={"movie/" + m.id}>
                  <Card key={m.id} card={m} />
                </Link>
                <div className="w-fit m-auto">
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
