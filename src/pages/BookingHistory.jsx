import { MdArrowForwardIos } from "react-icons/md";
import { TbClockHour8 } from "react-icons/tb";
import QRCode from "react-qr-code";

const BookingHistory = () => {
  return (
    <div className="w-full fixed">
      <div className="w-[90%] lg:w-[50%] m-auto mt-4 bg-white shadow-sm rounded-2xl lg:rounded-4xl pb-5">
        {/* Title */}
        <div className="text-center font-bold text-lg pt-5 text-gray-700">
          Booking History
        </div>

        {/* Separator */}
        <div className="my-4 mx-10 border-dashed border-t-2 border-gray-300" />

        {/* Ticket Card */}
        <div className="flex flex-col gap-4 max-h-[600px] lg:max-h-[500px] overflow-y-auto suggestion-list pb-5">
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <div className="relative w-[85%] lg:w-3/4 m-auto border shadow-lg rounded-xl bg-white">
              <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-lg font-semibold">Superman</h3>
                  <MdArrowForwardIos size={15} />
                </div>
                <p className="text-sm text-gray-700">
                  7th July • 10:30PM • Elite Premium
                </p>
                <div className="flex flex-row justify-between items-center">
                  <span className="text-sm font-medium">C1,C2</span>
                  <span className="text-sm font-bold">₹300</span>
                </div>

                {/* Dashed separator */}
                <div className="border-t border-dashed border-gray-300 my-4" />

                {/* Status & QR placeholder */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-1 items-center text-orange-500">
                    <TbClockHour8 size={20} />
                    <span className=" text-sm font-medium">Upcoming</span>
                  </div>
                  <div className="bg-white p-1 rounded-sm">
                    <QRCode value="https://yourapp.com/ticket/123" size={64} />
                  </div>
                </div>
              </div>

              {/* Left ticket notch */}
              <div className="absolute -left-4 top-[54%] -translate-y-1/2 w-7 h-7 bg-white rounded-full border-r border-gray-300 z-10" />

              {/* Right ticket notch */}
              <div className="absolute -right-4 top-[54%] -translate-y-1/2 w-7 h-7 bg-white rounded-full border-l border-gray-300 z-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
