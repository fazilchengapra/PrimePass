import React from "react";

const LoadingOverlay = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {" "}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3">
        {" "}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>{" "}
        <p className="text-gray-700 font-semibold">{text}</p>{" "}
      </div>{" "}
    </div>
  );
};

export default LoadingOverlay;
