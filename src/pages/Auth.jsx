import { Button, TextField } from "@radix-ui/themes";
import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full h-auto lg:h-[590px] bg-white">
      <div className="pt-5 lg:pt-10">
        <div className="m-auto w-[90%] lg:w-1/4 h-auto pb-3">
          <div className="flex flex-col gap-5 items-center">
            <div className="w-20 h-12 overflow-hidden">
              <img
                src="/asset/primePassLogo.png"
                className="object-cover"
                alt="Logo"
              />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h3 className="capitalize font-semibold">
                login in to your account
              </h3>
              <p className="text-sm text-gray-500">
                Welcome back! Please enter your details.
              </p>
            </div>

            <div className="relative flex w-full p-1 bg-gray-100 border border-gray-200 rounded-md">
              <div
                className={`absolute top-1 bottom-1 w-1/2 bg-white border border-black rounded-md shadow-sm transition-transform duration-300
                  ${
                    isLogin
                      ? "transform translate-x-0"
                      : "transform translate-x-full"
                  }`}
              />

              {/* Log In Button Div (made clickable) */}
              <div
                onClick={() => setIsLogin(true)}
                className={`relative z-10 w-1/2 cursor-pointer text-center py-2 px-5 text-xs font-bold transition-colors duration-300
                  ${isLogin ? "text-black" : "text-[#717680]"}`}
              >
                Log In
              </div>

              {/* Sign Up Button Div (made clickable) */}
              <div
                onClick={() => setIsLogin(false)}
                className={`relative z-10 w-1/2 cursor-pointer text-center py-2 px-5 text-xs font-bold transition-colors duration-300
                  ${isLogin ? "text-[#717680]" : "text-black"}`}
              >
                Sign Up
              </div>
            </div>

            {/* Form */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="capitalize text-sm text-[#414651]"
                >
                  Email
                </label>
                <TextField.Root
                  id="email"
                  size="2"
                  placeholder="Enter your email."
                  className="py-2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="pass"
                  className="capitalize text-sm text-[#414651]"
                >
                  Password
                </label>
                <TextField.Root
                  type="password"
                  id="pass"
                  size="2"
                  placeholder="Enter your password."
                  className="py-2"
                />
              </div>
              <Button className="bg-black rounded-lg">Sign in</Button>
            </div>
            <div className="text-sm text-[#535862] text-center">
              Don't have an account?{" "}
              <span className="text-sm font-bold text-black">Sign Up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
