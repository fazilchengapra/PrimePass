import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/user/Home";
import SeatSelector from "./pages/user/SeatSelector";
import Payment from "./pages/user/Payment";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./pages/user/ErrorBoundary";
import { NetworkErrorProvider } from "./components/context/NetworkErrorContext";
import MediaDetails from "./pages/user/MediaDetails";
import BookingHistory from "./pages/user/BookingHistory";
import { SocketProvider } from "./context/SocketContext";
import BookingDetails from "./pages/user/BookingDetails";
import ErrorPage from "./components/ErrorPage";
import Auth from "./pages/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
          <SocketProvider>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <App />
            </GoogleOAuthProvider>
          </SocketProvider>
        </ErrorBoundary>
      </NetworkErrorProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Auth />,
      },
      {
        path: "/user/booking-history",
        element: <BookingHistory />,
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
        path: "/movie/:movieId/theater/:id/payment",
        element: <Payment />,
      },
      {
        path: "/order/:id",
        element: <BookingDetails />,
      },
    ],
  },
]);

export default App;
