import Banner from "../components/Banner";
import Recommended from "../components/Recommended";
import NewRelease from "../components/NewRelease";

const Home = () => {
  return (
    <div className="h-full">
      <Banner />
      <Recommended />
      <NewRelease />
    </div>
  );
};

export default Home;
