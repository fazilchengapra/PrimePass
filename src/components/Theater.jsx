import { Avatar, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { formatTime } from "../utils/formatTime";

const Theater = ({shows}) => {

  return (
    <div className="flex flex-col gap-6">
      {shows.map((showsByTheater) => (
        <div key={showsByTheater.theaterId} className="flex flex-col gap-6">
          {/* Theater Header */}
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              src="https://assetscdn1.paytm.com/images/cinema/IMP-36f03b60-4d50-11ee-98df-79f500af65e9.png?imwidth=56"
              size="5"
              radius="full"
              fallback={showsByTheater.name[0]}
            />
            <div className="flex flex-col gap-1 text-start">
              <div className="text-sm lg:text-md font-bold">
                <h4>{showsByTheater.name}</h4>
              </div>
              <div className="text-xs font-semibold text-gray-500">
                <p>
                  {showsByTheater.location.address}, {showsByTheater.location.city}
                </p>
              </div>
            </div>
          </div>

          {/* Show Times */}
          <div className="flex flex-row flex-wrap gap-2">
            {showsByTheater.shows.map((index, show) => (
              <Link
                to={`theater/${showsByTheater.theaterId}/?timeIdx=${index}`}
                key={show.showId}
              >
                <Button
                  color="gray"
                  variant="surface"
                  highContrast
                  className="py-6 px-4 lg:px-10 rounded-md"
                >
                  {formatTime(show.startTime)}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Theater;
