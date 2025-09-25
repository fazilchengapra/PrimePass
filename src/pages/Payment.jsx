import { Button, Separator } from "@radix-ui/themes";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPendingRecord } from "../api/pendingRecord";
import { formatTime } from "../utils/formatTime";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import { createOrder, verifyPayment } from "../services/paymentService";

// 🔹 Simple Loading Overlay Component
const LoadingOverlay = ({ text }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-700 font-semibold">{text}</p>
    </div>
  </div>
);

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const movie = useSelector((state) => state.movie.selectedMovie);
  const theater = useSelector((state) => state?.theater?.theater);
  const mail = useSelector((state) => state?.user.email);

  const [bookingDetails, setBookingDetails] = useState({});
  const [loading, setLoading] = useState(false); // preparing Razorpay
  const [verifying, setVerifying] = useState(false); // backend verifying
  const [fetching, setFetching] = useState(true); // fetching booking details

  // 🔹 Payment Handler
  const handlePayment = async (pendingRecordId) => {
    try {
      setLoading(true); // preparing Razorpay order
      const { data } = await createOrder(pendingRecordId);

      const { id, amount, currency } = data.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "My Movie App",
        description: "Booking Payment",
        order_id: id,
        handler: async function (response) {
          try {
            setVerifying(true); // 🔹 show verifying overlay
            const result = await verifyPayment({
              pendingRecordId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              mail
            });
            toast.success("Payment Success!");
            navigate(`/order/${result.data.data.id}`);
          } catch (err) {
            toast.error("Payment Verification Failed!");
          } finally {
            setVerifying(false);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (err) {
      console.error(err);
      toast.error("Payment Failed!");
    } finally {
      setLoading(false); // stop "preparing" loader once popup opened
    }
  };

  // 🔹 Fetch Booking Records
  useEffect(() => {
    const fetchBookingRecords = async () => {
      try {
        setFetching(true);
        const result = await getPendingRecord(bookingId);
        setBookingDetails(result);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      } finally {
        setFetching(false);
      }
    };

    if (bookingId) fetchBookingRecords();
  }, [bookingId]);

  // 🔹 Show loading overlays
  if (fetching) {
    return <LoadingOverlay text="Fetching booking details..." />;
  }

  return (
    <div className="w-full h-full pt-20">
      {loading && <LoadingOverlay text="Opening payment gateway..." />}
      {verifying && (
        <LoadingOverlay text="Verifying your payment, please wait..." />
      )}

      <div className="bg-white m-auto w-[90%] lg:w-1/3 h-fit rounded-lg shadow-md">
        <div className="p-5">
          {/* Movie & Theater Info */}
          <div className="flex flex-row gap-3 items-center">
            <div className="w-2/12">
              <img
                alt={movie?.title || "poster"}
                className="w-full h-auto object-cover rounded-md"
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                    : "/fallback-poster.png"
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold lg:font-semibold">
                {movie?.title}
              </h3>
              <h5 className="text-sm font-semibold">{theater?.name}</h5>
            </div>
          </div>

          <Separator my="3" size="4" />

          {/* Booking Info */}
          <div className="flex flex-col gap-2 font-semibold lg:font-medium text-sm">
            <div>
              <span>
                Number of Seats:
                <span className="font-bold ml-2">
                  {bookingDetails?.data?.numberOfSeats}
                </span>
              </span>
            </div>
            <div>
              <span>Child: 0</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>
                Show Date: {formatDate(bookingDetails?.data?.showDate)}
              </span>
              <span>
                Show Time:{" "}
                <span className="ml-2 font-bold">
                  {formatTime(bookingDetails?.data?.showDate)}
                </span>
              </span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-6">
            <h3 className="text-lg font-bold lg:font-semibold">
              Payment Details
            </h3>
            <div className="mt-5 flex flex-col gap-4 font-semibold lg:font-normal">
              {bookingDetails?.data?.zoneDetails.map((e) => (
                <div
                  className="flex justify-between font-semibold"
                  key={e.name}
                >
                  <span>
                    {e.name} * {e.seats}
                  </span>
                  <span>{e.total}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Tax in Ticket:</span>
                <span>18%</span>
              </div>
            </div>
            <div className="flex justify-between font-bold lg:font-semibold mt-3">
              <span>Total:</span>
              <span>₹{bookingDetails?.data?.totalAmount}</span>
            </div>

            {/* Proceed Button */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="solid"
                className="py-5"
                onClick={() => handlePayment(bookingId)}
              >
                Proceed to Pay <FaCircleArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
