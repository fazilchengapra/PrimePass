import React from 'react';

const AuthToggle = ({ isLogin, onToggle }) => (
  <div className="relative flex w-full p-1 bg-gray-100 border border-gray-200 rounded-md">
    <div
      className={`absolute top-1 bottom-1 w-1/2 bg-white border border-black rounded-md shadow-sm transition-transform duration-300 ${isLogin ? "transform translate-x-0" : "transform translate-x-full"}`}
    />
    <div
      onClick={() => onToggle(true)}
      className={`relative z-10 w-1/2 cursor-pointer text-center py-2 px-5 text-xs font-bold transition-colors duration-300 ${isLogin ? "text-black" : "text-[#717680]"}`}
    >
      Log In
    </div>
    <div
      onClick={() => onToggle(false)}
      className={`relative z-10 w-1/2 cursor-pointer text-center py-2 px-5 text-xs font-bold transition-colors duration-300 ${isLogin ? "text-[#717680]" : "text-black"}`}
    >
      Sign Up
    </div>
  </div>
);

export default AuthToggle;