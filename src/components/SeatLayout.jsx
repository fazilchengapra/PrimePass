import React, { useEffect, useState } from "react";
import { getSeatsByShowId } from "../api/getSeatsByShowId";

const SeatLayout = ({ showId }) => {
  
  const [seatLayout, setSeatLayout] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await getSeatsByShowId(showId);
        if (response?.status) {
          setSeatLayout(response.data.seatLayout);
        }
      } catch (err) {
        console.error("Error fetching seats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchSeats();
    }
  }, [showId]);

  if (loading) return <p className="text-center py-10">Loading seats...</p>;
  if (!seatLayout) return <p className="text-center py-10">No seats found</p>;

  const areas = seatLayout?.colAreas?.objArea || [];
  const maxSeats = seatLayout?.colAreas?.intMaxSeatId || 10;

  const seatSelector = (seatObj, isBooked) => {
    if (isBooked) return;

    const seatData = {
      name: seatObj.seatNumber,
      id: seatObj._id || `${seatObj.seatNumber}-${seatObj.GridSeatNum}`,
    };

    const alreadySelected = selectedSeats.find((s) => s.name === seatData.name);

    if (alreadySelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.name !== seatData.name));
    } else {
      setSelectedSeats([...selectedSeats, seatData]);
    }
  };

  return (
    <div className="w-full h-auto overflow-y-auto p-4 space-y-10 pb-20">
      {areas.map((area) => (
        <div key={area.AreaCode} className="flex flex-col gap-4 relative w-full">
          {/* Area title with price */}
          <div className="sticky top-0 bg-white py-2 z-10">
            <h2 className="text-lg font-bold text-center w-full">
              {area.AreaDesc} - ₹{area.AreaPrice}
            </h2>
          </div>

          {/* Horizontal scroll wrapper */}
          <div className="w-full overflow-x-auto flex-none lg:flex justify-center">
            <div
              className="inline-grid gap-2 min-w-max"
              style={{
                gridTemplateColumns: `repeat(${maxSeats + 1}, minmax(2rem, auto))`,
              }}
            >
              {area.objRow.map((row) => (
                <React.Fragment key={row.GridRowId}>
                  {/* Row Label */}
                  <div className="font-semibold text-xs sm:text-sm flex items-center justify-center w-8 h-8 min-w-[2rem] text-center sticky left-0 bg-white z-10">
                    {row.PhyRowId}
                  </div>

                  {/* Seats */}
                  {Array.from({ length: maxSeats }, (_, idx) => {
                    const seatNum = idx + 1;
                    const seatObj = row.objSeat.find(
                      (s) => s.GridSeatNum === seatNum
                    );

                    if (!seatObj) {
                      return (
                        <div
                          key={`empty-${row.PhyRowId}-${seatNum}`}
                          className="w-8 h-8 min-w-[2rem] border-none"
                        />
                      );
                    }

                    const isBooked = seatObj.SeatStatus !== "1"; // assume 1 = available
                    const isSelected = selectedSeats.some(
                      (s) => s.name === seatObj.seatNumber
                    );

                    let seatClass = "bg-gray-200 cursor-pointer"; // available
                    if (isBooked)
                      seatClass = "bg-red-500 text-white cursor-not-allowed";
                    if (isSelected)
                      seatClass = "bg-blue-500 text-white cursor-pointer";

                    return (
                      <div
                        onClick={() => seatSelector(seatObj, isBooked)}
                        key={`${row.PhyRowId}-${seatObj.GridSeatNum}`}
                        className={`w-8 h-8 min-w-[2rem] border border-gray-400 rounded-md flex items-center justify-center text-xs ${seatClass}`}
                      >
                        {seatObj.displaySeatNumber}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Screen at bottom */}
      <div className="flex justify-center mt-10 mb-5">
        <div className="w-[350px] lg:w-[400px]">
          <img
            alt="screen"
            className="w-full object-contain"
            src="https://district.ticketnew.com/movies_assets/_next/static/media/screen-img-light.b7b18ffd.png"
          />
        </div>
      </div>

      {/* Proceed button fixed at bottom */}
      {selectedSeats.length > 0 && (
        <div className="rounded-md fixed bottom-0 left-0 w-full bg-white border-t p-4 flex items-center justify-between shadow-md z-50">
          <p className="font-medium text-gray-800">
            Selected Seats:{" "}
            <span className="font-bold">
              {selectedSeats.length}
            </span>
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Proceed
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
