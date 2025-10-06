import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { Link } from "react-router-dom";
import { forgotPasswordSchema } from "../schemas/authSchema";
import { MdErrorOutline } from "react-icons/md";

export default function ForgotPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange", // ✅ validates every keystroke
  });

  const handleClick = (data) => {
    console.log("Reset password for:", data.email);
    // call backend API here
  };

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

          {/* ✅ Proper Form */}
          <form onSubmit={handleSubmit(handleClick)}>
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
              />
              {errors.email && (
                <div className="flex flex-row gap-1 items-center text-sm text-red-600 mt-1">
                  <MdErrorOutline />
                  <div>{errors.email.message}</div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={errors.email}
              className={`w-full ${
                errors.email
                  ? "bg-gray-300 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              } font-medium py-3 rounded-lg transition duration-200`}
            >
              Reset password
            </button>
          </form>

          {/* Back link */}
          <Link
            to="#"
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
