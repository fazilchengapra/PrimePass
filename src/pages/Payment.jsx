import { AlertDialog, Button, Flex, Separator } from "@radix-ui/themes";
import { FaCircleArrowRight } from "react-icons/fa6";
import PaymentMethods from "../components/PaymentMethods";
import { IoIosClose } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPendingRecord } from "../api/pendingRecord";
import { formatTime } from "../utils/formatTime";
import { formatDate } from "../utils/formatDate";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const seatCount = Number(searchParams.get("count") || 0); // safer
  const bookingId = searchParams.get("bookingId");

  const movie = useSelector((state) => state.movie.selectedMovie);
  const theater = useSelector((state) => state?.theater?.theater);

  const [bookingDetails, setBookingDetails] = useState({});

  const handlePayment = async (pendingRecordId) => {
    try {
      // 1. Create order from backend
      const {data} = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        {
          pendingRecordId,
        },
        { withCredentials: true }
      );

      
      const {  id, amount, currency } = data.data;

      console.log(id, amount, currency);
      

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // from backend (public key)
        amount,
        currency,
        name: "My Movie App",
        description: "Booking Payment",
        order_id: id,
        handler: async function (response) {
          console.log(response);
          
          // 3. On success, send details to backend for verification
          const result = await axios.post(
            "http://localhost:5000/api/payments/verify-payment",
            {
              pendingRecordId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );
          
          toast.success('Payment Success!')
          navigate(`/order/${result.data.data.id}`)
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error('Payment Failed!')
    }
  };

  useEffect(() => {
    const fetchBookingRecords = async () => {
      try {
        const result = await getPendingRecord(bookingId);
        setBookingDetails(result);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    if (bookingId) fetchBookingRecords();
  }, [bookingId]);

  const ticketPrice = 110;
  const taxRate = 0.18;
  const totalAmount = (ticketPrice * seatCount * (1 + taxRate)).toFixed(2);

  return (
    <div className="w-full h-full pt-20">
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
                <div className="flex justify-between font-semibold"key={e.name}>
                  <span>
                    {e.name} * {e.seats}
                  </span>
                  <span>{e.total}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Tax in Ticket:</span>
                <span>{taxRate * 100}%</span>
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
