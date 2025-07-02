import "./App.css";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Recommended from "./components/Recommended";

function App() {
  return (
    <div className="App w-full h-full bg-[#E5E7EB] fixed">
      <Nav />
      <div className="overflow-y-auto h-full">
        <Banner />
        <Recommended />
      </div>
    </div>
  );
}

export default App;
