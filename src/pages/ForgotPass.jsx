import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { MdOutlineEmail, MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { forgotPasswordSchema } from "../schemas/authSchema";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import { Spinner } from "@radix-ui/themes";

export default function ForgotPass() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (data) => {
    setLoading(true);
    try {
      const res = await forgotPassword(data.email);
      console.log(res);
      setSuccess(true);
      setEmail(data.email);
      toast.success(res.message || "Password reset link sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Form View
  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <GoLock className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
              Forgot password?
            </h1>

            <p className="text-center text-gray-600 text-sm mb-8">
              No worries, we'll send you reset instructions.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(handleForgotPassword)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  disabled={loading}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                    <MdErrorOutline />
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
                  !isValid || loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Reset password
                {loading && <Spinner />}
              </button>
            </form>

            {/* Back link */}
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 w-full mt-6 text-gray-600 hover:text-gray-900 text-sm font-medium transition"
            >
              <FaArrowLeftLong className="w-4 h-4" />
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Email Sent Success View
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <div className="w-full max-w-md">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <MdOutlineEmail className="w-8 h-8 text-gray-700" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-3">
          Check your email
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center text-sm mb-8">
          We sent a password reset link to
          <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>

        {/* Open Email Button */}
        <a
          href="mailto:"
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6 text-center"
        >
          Open email app
        </a>

        {/* Resend Link */}
        {/* <p className="text-center text-sm text-gray-600 mb-4">
          Didn't receive the email?{" "}
          <button
            
            disabled={loading}
            className="text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Click to resend"}
          </button>
        </p> */}

        {/* Back to Login Link */}
        <Link
          to="/register"
          className="flex items-center justify-center gap-2 w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition"
        >
          <FaArrowLeftLong className="w-4 h-4" />
          Back to log in
        </Link>
      </div>
    </div>
  );
}
