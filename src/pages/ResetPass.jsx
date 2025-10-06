import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { resetPasswordSchema } from "../schemas/authSchema";
import { MdErrorOutline } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";
import { Spinner } from "@radix-ui/themes";

export default function ResetPass() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams[0].get("token");
  const email = searchParams[0].get("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await resetPassword(token, email, password);
      toast.success(res.message || "Password reset successfully!");
      navigate("/register");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <GoLock className="w-7 h-7 text-gray-700" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Set new password
          </h1>

          <p className="text-sm text-gray-600 text-center mb-8">
            Your new password must be different to previously used passwords.
          </p>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.password && (
                <div className="flex flex-row gap-1 items-center text-sm text-red-600 mt-1">
                  <MdErrorOutline />
                  <div>{errors.password.message}</div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <div className="flex flex-row gap-1 items-center text-sm text-red-600 mt-1">
                  <MdErrorOutline />
                  <div>{errors.confirmPassword.message}</div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit(handleClick)}
              className={`w-full font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              Reset password
              {loading && <Spinner />}
            </button>
          </div>

          <Link
            to={"/register"}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mt-6 transition-colors duration-200"
          >
            <FaArrowLeftLong className="w-4 h-4" />
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
