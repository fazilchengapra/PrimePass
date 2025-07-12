import { Button, Separator } from "@radix-ui/themes";
import { mockSeatLayout } from "../data/seatLayout";

const SeatSelector = () => {
  return (
    <div className="w-[90%] lg:w-2/3 m-auto min-h-[600px] rounded-md bg-white mt-6">
      <div className="mx-4 pt-5">
        <div className="flex flex-row gap-3 items-center py-2">
          <div className="flex flex-col text-sm">
            <span>Sat</span>
            <span className="font-semibold">12 Jul</span>
          </div>
          <div>
            <Button
              color="gray"
              variant="surface"
              highContrast
              className="py-6 px-4 lg:px-10 rounded-md"
            >
              6:30 PM
            </Button>
          </div>
          <div>
            <Button
              color="gray"
              variant="surface"
              highContrast
              className="py-6 px-4 lg:px-10 rounded-md"
            >
              9:00 PM
            </Button>
          </div>
        </div>
        <Separator size="4" />
        <div className="mt-10 pb-5">
          <div className="text-center font-semibold text-md">
            <h4>PLATINUM: ₹110</h4>
          </div>
          <div className="mt-5 overflow-x-auto max-h-[400px]">
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
                            key={row + seat.number}
                            color="gray"
                            variant="surface"
                            className="px-4 py-3 rounded-lg"
                            highContrast
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
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
