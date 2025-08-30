// src/pages/ErrorPage.jsx
import { Button } from "@radix-ui/themes";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError?.() || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-600 mb-6">
        {error.statusText || error.message || "Unexpected error occurred."}
      </p>

      <div className="flex gap-4">
        <Button onClick={() => navigate("/")}>Go Home</Button>
        <Button variant="surface" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
