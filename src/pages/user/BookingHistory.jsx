import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { TbClockHour8 } from "react-icons/tb";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { fetchBookingHistory } from "../../services/bookingService";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetchBookingHistory();

        setBookings(res.data.bookings);
      } catch (err) {
        console.error("Failed to load booking history", err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="w-full fixed">
      <div className="w-[90%] lg:w-[50%] m-auto mt-4 bg-white shadow-sm rounded-2xl lg:rounded-4xl pb-5">
        <div className="text-center font-bold text-lg pt-5 text-gray-700">
          Booking History
        </div>

        <div className="my-4 mx-10 border-dashed border-t-2 border-gray-300" />

        <div className="flex flex-col gap-4 max-h-[600px] lg:max-h-[500px] overflow-y-auto suggestion-list pb-5">
          {bookings?.map((b) => (
            <Link key={b?.id} to={`/order/${b?.id}`}>
              <div className="relative w-[85%] lg:w-3/4 m-auto border shadow-lg rounded-xl bg-white">
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-lg font-semibold">{b?.movieTitle}</h3>
                    <MdArrowForwardIos size={15} />
                  </div>
                  <p className="text-sm text-gray-700">
                    {new Date(b?.showTime).toLocaleDateString()} •{" "}
                    {new Date(b?.showTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {b?.theater}
                  </p>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm font-medium">
                      {b?.seats?.map((e) => e.number).join(", ")}
                    </span>
                    <span className="text-sm font-bold">₹{b?.totalPrice}</span>
                  </div>

                  <div className="border-t border-dashed border-gray-300 my-4" />

                  <div className="flex justify-between items-center">
                    <div
                      className={`flex flex-row gap-1 items-center ${
                        b.status === "Upcoming"
                          ? "text-orange-500"
                          : b.status === "Completed"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <TbClockHour8 size={20} />
                      <span className=" text-sm font-medium">{b.status}</span>
                    </div>
                    <div className="bg-white p-1 rounded-sm">
                      <QRCode value={b.qrCodeUrl} size={64} />
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 top-[54%] -translate-y-1/2 w-7 h-7 bg-white rounded-full border-r border-gray-300 z-10" />
                <div className="absolute -right-4 top-[54%] -translate-y-1/2 w-7 h-7 bg-white rounded-full border-l border-gray-300 z-10" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
