import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import { Spinner } from "@radix-ui/themes";
import { verifyEmail } from "../services/authService";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const email = location.state?.email;
    if (user?.isAuthenticated) {
      navigate("/");
    }

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleClick = async () => {
    try {
      const enteredOtp = otp.join("");
      if (enteredOtp.length === 6) {
        setIsLoading(true);
        const res = await verifyEmail(enteredOtp, email);
        toast.success(res.message);
        dispatch(setUser(res.user));
        navigate("/");
      }
      return;
    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsLoading(false)
    }
  };
  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Email Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg mb-5">
            <MdOutlineEmail className="w-7 h-7 text-gray-600" />
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Check your email
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-6">
            We sent a verification code to
            <br />
            <span className="font-medium">{email}</span>
          </p>

          {/* OTP Input */}
          <div className="flex justify-center gap-2 mb-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-11 text-center text-xl font-semibold text-gray-800 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            disabled={isLoading}
            onClick={() => handleClick()}
            className={`font-medium py-2.5 px-4 rounded-lg transition-colors mb-5 w-full ${
              isLoading
                ? "bg-gray-300 text-gray-400"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                Verifying <Spinner />
              </span>
            ) : (
              "Verify my email"
            )}
          </button>

          {/* Resend Link */}
          <p className="text-sm text-gray-600 mb-5">
            Didn't receive the email?{" "}
            <button
              className={`text-purple-600 hover:text-purple-700 font-medium`}
            >
              Click to resend
            </button>
          </p>

          
          <Link to={'/register'}><button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            <FiArrowLeft className="w-4 h-4" />
            Back to registration
          </button></Link>
        </div>
      </div>
    </div>
  );
}
