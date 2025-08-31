import { useEffect } from "react";
import Banner from "../components/Banner";
import Recommended from "../components/Recommended";
import NewRelease from "../components/NewRelease";
import MostPopularMovies from "../components/MostPopularMovies";
import { useDispatch } from "react-redux";
import { clearTool } from "../app/searchSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearTool());
    console.log("Home Mounted");
    
  }, [dispatch]);

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
