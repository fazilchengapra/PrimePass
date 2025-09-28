import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../schemas/authSchema";
import { CgDanger } from "react-icons/cg";
import { loginUser, registerUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  if (user?.isAuthenticated) {
    navigate("/");
  }

  const authCore = {
    login: {
      title: "login in to your account",
      disc: "Welcome back! Please enter your details.",
      buttonText: "Sign In",
      schema: loginSchema,
      field: [
        {
          label: "email",
          type: "email",
          placeh: "Enter your email.",
        },
        {
          label: "password",
          type: "password",
          placeh: "Enter your password.",
        },
      ],
    },
    register: {
      title: "Create an account",
      disc: "Join us today! Please fill in your information.",
      buttonText: "Get started",
      schema: registerSchema,
      field: [
        {
          label: "username",
          type: "text",
          placeh: "Enter your name.",
        },
        {
          label: "email",
          type: "email",
          placeh: "Enter your email.",
        },
        {
          label: "password",
          type: "password",
          placeh: "Create a password",
        },
      ],
    },
  };

  // Select the correct object (login or register) based on the isLogin state
  const currentForm = isLogin ? authCore.login : authCore.register;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(currentForm.schema),
  });

  const onSubmit = async ({ email, password, username }) => {
    try {
      setIsLoading(true);
      if (isLogin) {
        const res = await loginUser(email, password);
        dispatch(setUser(res.user));
        toast.success(res.message);
      } else {
        const res = await registerUser(username, email, password);
        toast.success(res.message);
        setIsLogin(true)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      username: "",
    });
    reset()
  }, [isLogin, reset]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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
                {/* Use the title from the selected object */}
                {currentForm.title}
              </h3>
              <p className="text-sm text-gray-500">
                {/* Use the description from the selected object */}
                {currentForm.disc}
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
              <div
                onClick={() => setIsLogin(true)}
                className={`relative z-10 w-1/2 cursor-pointer text-center py-2 px-5 text-xs font-bold transition-colors duration-300
                  ${isLogin ? "text-black" : "text-[#717680]"}`}
              >
                Log In
              </div>
              <div
                onClick={() => setIsLogin(false)}
                className={`relative z-10 w-1/2 cursor-pointer text-center py-2 px-5 text-xs font-bold transition-colors duration-300
                  ${isLogin ? "text-[#717680]" : "text-black"}`}
              >
                Sign Up
              </div>
            </div>

            {/* DYNAMIC FORM */}
            <div className="w-full flex flex-col gap-3">
              {/* Map over the fields from the selected object */}
              {currentForm.field.map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label
                    htmlFor={field.label}
                    className="capitalize text-sm text-[#414651]"
                  >
                    {field.label}
                  </label>
                  <TextField.Root
                    {...register(field.label)}
                    type={field.type}
                    id={field.label}
                    value={formData[field.label]}
                    size="2"
                    placeholder={field.placeh}
                    className="py-2"
                    onChange={handleChange}
                  />
                  {errors?.[field.label]?.message && (
                    <div className="flex flex-row items-center gap-1 text-red-500 text-xs">
                      <CgDanger />
                      {errors?.[field.label]?.message}
                    </div>
                  )}
                </div>
              ))}
              <Button
                className="bg-black rounded-lg text-white"
                onClick={handleSubmit(onSubmit)}
                loading={isLoading}
              >
                {/* Use the button text from the selected object */}
                {currentForm.buttonText}
              </Button>
            </div>

            {/* DYNAMIC BOTTOM LINK */}
            <div className="text-sm text-[#535862] text-center">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className="text-sm font-bold text-black cursor-pointer"
                onClick={() => setIsLogin(!isLogin)} // Toggle the state
              >
                {isLogin ? "Sign Up" : "Log In"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
