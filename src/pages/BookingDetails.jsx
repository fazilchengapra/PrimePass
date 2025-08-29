import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";

// A nice animated loading spinner
const LoadingPage = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
  </div>
);

const BookingDetails = () => {
  const { id } = useParams(); // booking id from route
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/order/${id}`, {
          withCredentials: true, // ✅ send cookies
        });

        if (res.data.success) {
          setBooking(res.data.data);
        } else {
          setError("Booking not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    <div className="flex justify-center mt-6 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-gray-200 p-6 flex flex-col gap-6">
        {/* Movie Info */}
        <div className="flex gap-5">
          <img
            className="w-28 h-40 object-cover rounded-lg shadow-md"
            src={`https://image.tmdb.org/t/p/original/${booking.posterUrl}`}
            alt={booking.movieTitle}
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{booking.movieTitle}</h1>
            <div className="text-gray-600 text-sm space-y-1">
              {/* Example: Hindi, 2D */}
              <p>{booking.language ? `${booking.language}, ${booking.format}` : "—"}</p>
              <p>
                {new Date(booking.showDate).toLocaleDateString()} |{" "}
                {new Date(booking.showDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{booking.theaterName}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div
          className={`w-full py-2 rounded-xl text-center ${
            booking.paymentStatus === "paid"
              ? "bg-green-500"
              : booking.paymentStatus === "failed"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          <p className="text-sm font-semibold text-white uppercase tracking-wide">
            {booking.paymentStatus === "paid"
              ? "Booking Confirmed"
              : booking.paymentStatus === "failed"
              ? "Payment Failed"
              : "Payment Pending"}
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Ticket & QR */}
        <div className="flex gap-6 items-center">
          <QRCode
            value={`https://yourapp.com/ticket/${booking.bookingId}`}
            size={100}
          />
          <div className="flex flex-col gap-3 flex-1 text-center">
            <p className="text-gray-600 text-lg">{booking.numberOfSeats} Ticket(s)</p>
            <div className="space-y-1">
              <p className="text-xl font-bold text-gray-900 uppercase">
                {booking.screenName || "Screen"}
              </p>
              <p className="text-gray-600 text-sm uppercase">
                {booking.zoneDetails?.map(
                  (zone) =>
                    `${zone.name} - ${booking.seats
                      .map((s) => `${s.row}${s.number}`)
                      .join(", ")}`
                )}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Booking ID: <span className="font-semibold">{booking.bookingId}</span>
            </p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-700">Total Amount</p>
          <p className="text-xl font-bold text-gray-900">
            {booking.currency} {booking.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
