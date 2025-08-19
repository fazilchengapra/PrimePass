import { Button, Separator } from "@radix-ui/themes";
import { showtimes } from "../data/showtimes";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTheater } from "../app/theaterSlice";
import SeatLayout from "../components/SeatLayout";

const SeatSelector = () => {
  const [showtime, setShowtime] = useState();
  const { id: theaterId, movieId } = useParams();
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time");
  const dispatch = useDispatch();

  const showTimes = showtimes.find((show) => show.id.toString() === theaterId);

  useEffect(() => {
    setShowtime(time);
    dispatch(setTheater(showTimes));
  }, [time, dispatch, showTimes]);

  return (
    <div className="w-full fixed">
      <div className="w-[90%] lg:w-2/3 m-auto max-h-[600px] rounded-md bg-white mt-6 overflow-y-auto">
        <div className="mx-4 flex flex-col gap-4 pt-4">
          <div className="flex flex-row gap-3 items-center py-2">
            <div className="flex flex-col text-sm min-w-fit">
              <span>Sat</span>
              <span className="font-semibold">12 Jul</span>
            </div>
            <div className="flex flex-row gap-2 overflow-x-auto w-full suggestion-list">
              {showTimes.shows.map((e, index) => (
                <Button
                  key={index}
                  color="gray"
                  variant="surface"
                  highContrast
                  className={`py-6 px-4 lg:px-10 rounded-md ${
                    e === showtime && "bg-gray-200"
                  }`}
                  onClick={() => setShowtime(e)}
                >
                  {e}
                </Button>
              ))}
            </div>
          </div>
          <Separator size="4" />
          <div className="mt-5 pb-5">
            <SeatLayout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
