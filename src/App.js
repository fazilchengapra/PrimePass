import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SeatSelector from "./pages/SeatSelector";
import Payment from "./pages/Payment";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./pages/ErrorBoundary";
import { NetworkErrorProvider } from "./components/context/NetworkErrorContext";

function App() {
  return (
    <div className="w-full !bg-[#E5E7EB] relative pb-1 h-screen">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Nav />
      </div>

      {/* Page Content */}
      <div>
        <ScrollToTop />
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <NetworkErrorProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </NetworkErrorProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "/movie/:movieId/theater/:id/show",
        element: <SeatSelector />,
      },
      {
        path: "/movie/:movieId/theater/:id/show/payment",
        element: <Payment />,
      },
    ],
  },
]);

export default App;
