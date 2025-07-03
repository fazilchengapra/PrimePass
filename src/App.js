import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App w-full h-full bg-[#E5E7EB] fixed">
      <Nav />
      <div className="overflow-y-auto h-full">
        <Outlet />
      </div>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
]);

export default App;
