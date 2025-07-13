import React, { useState } from "react";
import { mockSeatLayout } from "../data/seatLayout";
import { Button } from "@radix-ui/themes";

const TheaterSeats = () => {
  const [selected, setSelected] = useState([]);

  const select = (row, number) => {
    const alreadySelected = selected.some(
      (item) => item.row === row && item.id === number
    );

    console.log(alreadySelected);

    if (alreadySelected) {
      setSelected(
        selected.filter((item) => !(item.row === row && item.id === number))
      );
    } else {
      setSelected([...selected, { row, id: number }]);
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
      <div className={`flex justify-end mr-5 mt-2 ${selected.length > 0 ? 'block' : 'hidden'}`}>
        <Button className="py-5 px-10 rounded-lg text-lg bg-blue-500">Proceed</Button>
      </div>
    </div>
  );
};

export default TheaterSeats;
