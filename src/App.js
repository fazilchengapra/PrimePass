import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SeatSelector from "./pages/SeatSelector";
import Payment from "./pages/Payment";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./pages/ErrorBoundary";
import { NetworkErrorProvider } from "./components/context/NetworkErrorContext";
import MediaDetails from "./pages/MediaDetails";
import Register from "./pages/Register";
import BookingDetails from "./pages/BookingDetails";

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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user/booking-history",
        element: <BookingDetails />,
      },
      {
        path: "/movie/:movieId",
        element: <MediaDetails />,
      },
      {
        path: "/movie/:movieId/theater/:id",
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
