import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthFormConstant } from "../../constants/formConstant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  googleAuth,
  loginUser,
  registerUser,
} from "../../services/authService";
import { setUser } from "../../app/userSlice";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  if (user?.isAuthenticated) {
    navigate("/");
  }

  const currentForm = isLogin
    ? AuthFormConstant.login
    : AuthFormConstant.register;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentForm.schema),
  });

  const handleFormSubmit = async ({ email, password, username }) => {
    try {
      setIsLoading(true);
      if (isLogin) {
        const res = await loginUser(email, password);
        dispatch(setUser(res.user));
        toast.success(res.message);
      } else {
        const res = await registerUser(username, email, password);
        toast.success(res.message);
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  const handleGoogleLogin = useGoogleLogin({
    flow: "code",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await googleAuth(tokenResponse.code);
        console.log(res);

        dispatch(setUser(res.user));
        toast.success(res.message);
        navigate("/");
      } catch (err) {
        toast.error("Google login failed");
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  return {
    isLogin,
    setIsLogin,
    isLoading,
    currentForm,
    register,
    errors,
    handleFormSubmit: handleSubmit(handleFormSubmit), // Pre-bind with react-hook-form's handleSubmit
    handleGoogleLogin,
  };
};
