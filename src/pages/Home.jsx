import Banner from "../components/Banner";
import Recommended from "../components/Recommended";
import NewRelease from "../components/NewRelease";
import MostPopularMovies from "../components/MostPopularMovies";

const Home = () => {
  return (
    <div className="h-full select-none">
      <Banner />
      <Recommended />
      <NewRelease />
      <MostPopularMovies />
    </div>
  );
};

export default Home;
