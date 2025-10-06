// GuestRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user._id) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
