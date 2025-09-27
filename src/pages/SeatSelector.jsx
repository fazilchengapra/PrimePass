import { Button, Separator } from "@radix-ui/themes";
import SeatLayout from "../components/SeatLayout";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import { useState } from "react";

const SeatSelector = () => {
  const showData = useSelector((state) => state.show);
  const selectedDate = useSelector((state) => state.show.sltDate); // e.g. "2025-08-24"

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const idx = searchParams.get("timeIdx");

  // Get theater by ID
  const showTimes = showData?.show?.theaters?.find((e) => e?.theaterId === id);

  // Filter shows by selected date
  const filteredShows =
    showTimes?.shows?.filter((show) => {
      const showDate = show.startTime.split("T")[0];
      return showDate === selectedDate;
    }) || [];

  // If URL param index exists, use that, else default to first filtered show
  const [timeIdx, setTimeIdx] = useState(idx ? parseInt(idx) : 0);

  const showId = filteredShows[timeIdx]?.showId || null;

  return (
    <div className="w-full fixed">
      <div className="w-[90%] lg:w-2/3 m-auto max-h-[600px] rounded-md bg-white mt-6 overflow-y-auto">
        <div className="mx-4 flex flex-col gap-4 pt-4">
          {selectedDate && showId ? (
            <div>
              <div className="flex flex-row gap-3 items-center py-2">
                {/* Display selected date */}
                <div className="flex flex-col text-sm min-w-fit">
                  <span>
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span className="font-semibold">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>

                {/* Showtimes (filtered by date) */}
                <div className="flex flex-row gap-2 overflow-x-auto w-full suggestion-list">
                  {filteredShows.map((e, index) => (
                    <Button
                      key={e.showId}
                      color="gray"
                      variant="surface"
                      onClick={() => setTimeIdx(index)}
                      highContrast
                      className={`py-6 px-4 lg:px-10 rounded-md ${
                        timeIdx === index ? "bg-gray-200" : ""
                      }`}
                    >
                      {formatTime(e.startTime)}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator size="4" />

              {/* Seat Layout */}
              <div className="mt-5 pb-5">
                <SeatLayout showId={showId} />
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2 p-2 my-2 rounded-md bg-red-600 font-bold lg:font-semibold text-white">
              Oops! something went wrong!{" "}
              <a href="/" className="text-xs underline font-normal">
                Go to home
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
