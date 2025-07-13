import { Button, Separator } from "@radix-ui/themes";
import TheaterSeats from "../components/TheaterSeats";

const SeatSelector = () => {
  return (
    <div className="w-[90%] lg:w-2/3 m-auto min-h-[600px] rounded-md bg-white mt-6">
      <div className="mx-4">
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
        <div className="mt-5 pb-5">
          <div className="text-center font-semibold text-md pb-2">
            <h4>PLATINUM: ₹110</h4>
          </div>
          <div className="">
            <TheaterSeats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
