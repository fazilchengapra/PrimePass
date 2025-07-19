import React from "react";

const EmptyState = ({ status, message }) => {
  return (
    <div className="w-full">
      <div className="w-1/2 m-auto justify-center items-center">
        <div className="flex flex-col gap-4 m-auto w-fit">
          <img
            src="/asset/404.svg"
            className="w-36 lg:w-48 h-auto"
            alt={status}
          />
          <div className="text-blue-800 font-bold text-center">
            <span className="text-sm capitalize">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
