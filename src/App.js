import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <div className="h-full w-full !bg-[#E5E7EB] relative pb-1">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Nav />
      </div>

      {/* Page Content */}
      <div className="pt-4">
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
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);

export default App;
