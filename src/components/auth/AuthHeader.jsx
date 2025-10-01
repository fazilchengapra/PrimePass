import React from "react";

const AuthHeader = ({ title, description }) => (
  <>
    <div className="w-20 h-12 overflow-hidden">
      <img src="/asset/primePassLogo.png" className="object-cover" alt="Logo" />
    </div>
    <div className="flex flex-col gap-2 text-center">
      <h3 className="capitalize font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </>
);

export default AuthHeader;
