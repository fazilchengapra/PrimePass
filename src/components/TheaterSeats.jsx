import React, { useState } from "react";
import { mockSeatLayout } from "../data/seatLayout";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TheaterSeats = ({ time, movieId, showtime }) => {
  const [selected, setSelected] = useState([]);

  const select = (row, number) => {
    const alreadySelected = selected.some(
      (item) => item.row === row && item.id === number
    );

    if (alreadySelected) {
      setSelected(
        selected.filter((item) => !(item.row === row && item.id === number))
      );
    } else {
      if (selected.length < 10)
        setSelected([...selected, { row, id: number }]);
      else toast.error("Can't Select 10 more Seats!");
    }
  };

  return (
    <div>
      <div className="mt-1 overflow-x-auto max-h-[400px] ">
        <div className="min-w-max flex flex-col gap-2">
          {mockSeatLayout.map(({ row, seats }) => (
            <div className="flex flex-row gap-4 items-center" key={row}>
              <div className="w-full text-start text-md font-semibold uppercase text-gray-500">
                <span>{row}</span>
              </div>
              <div className="text-start flex flex-row gap-1 items-center">
                {seats.map((seat, index) => (
                  <div key={row + index}>
                    {seat.number ? (
                      <Button
                        disabled={seat.status === "unavailable"}
                        key={row + seat.number}
                        color="gray"
                        variant="surface"
                        className={`px-4 py-3 rounded-lg ${
                          selected.some(
                            (item) =>
                              item.row === row && item.id === seat.number
                          ) && "bg-blue-500 text-white"
                        }`}
                        highContrast
                        onClick={() => select(row, seat.number)}
                      >
                        {seat.number}
                      </Button>
                    ) : (
                      <div
                        key={row + index}
                        className="px-6 lg:px-[1.4rem] py-3 rounded-lg"
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-center pt-10 pb-5">
            <div className="w-[350px] lg:w-[400px]">
              <img
                alt="screen"
                className="w-full object-contain ml-10 lg:ml-20"
                src="https://district.ticketnew.com/movies_assets/_next/static/media/screen-img-light.b7b18ffd.png"
              />
            </div>
          </div>
        </div>
      </div>

      {selected.length > 0 ? (
        <div className={`flex flex-row justify-between mr-5 mt-2 items-center`}>
          <div className="flex flex-row gap-2 text-gray-500">
            <span className="font-bold">{selected.length}</span>
            <span>Seat Selected</span>
          </div>
          <div>
            <Link
              to={`/movie/${movieId}/theater/1/show/payment?time=${showtime}&count=${selected.length}`}
            >
              <Button className="py-5 px-10 rounded-lg text-lg bg-blue-500">
                Proceed
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-row gap-5 justify-center mt-2">
          <div className="flex flex-row items-center gap-2">
            <Button
              disabled={true}
              color="gray"
              variant="surface"
              className={`px-2 py-2 rounded-lg
          `}
            >
              01
            </Button>
            <span className="text-xs">Taken</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              disabled={true}
              color="gray"
              variant="surface"
              className={`px-2 py-2 rounded-lg bg-blue-500 text-white w-fit`}
            >
              01
            </Button>
            <span className="text-xs">Selected</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              color="gray"
              variant="surface"
              className={`px-2 py-2 rounded-lg w-fit`}
            >
              01
            </Button>
            <span className="text-xs">Available</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterSeats;
