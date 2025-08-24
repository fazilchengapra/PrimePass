import { Avatar, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import { useSelector } from "react-redux";

const Theater = ({ shows }) => {
  const selectedDate = useSelector((state) => state.show.sltDate); // "2025-08-24"

  return (
    <div className="flex flex-col gap-6">
      {shows
        .map((theater) => {
          // Filter shows by selected date (compare YYYY-MM-DD part only)
          const filteredShows = theater.shows.filter((show) => {
            const showDate = show.startTime.split("T")[0]; // "2025-08-24"
            return showDate === selectedDate;
          });

          if (filteredShows.length === 0) return null; // Skip theaters with no shows that day

          return (
            <div key={theater.theaterId} className="flex flex-col gap-6">
              {/* Theater Header */}
              <div className="flex flex-row gap-2 items-center">
                <Avatar
                  src="https://assetscdn1.paytm.com/images/cinema/IMP-36f03b60-4d50-11ee-98df-79f500af65e9.png?imwidth=56"
                  size="5"
                  radius="full"
                  fallback={theater.name[0]}
                />
                <div className="flex flex-col gap-1 text-start">
                  <div className="text-sm lg:text-md font-bold">
                    <h4>{theater.name}</h4>
                  </div>
                  <div className="text-xs font-semibold text-gray-500">
                    <p>
                      {theater.location.address}, {theater.location.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Show Times */}
              <div className="flex flex-row flex-wrap gap-2">
                {filteredShows.map((show, index) => (
                  <Link
                    to={`theater/${theater.theaterId}/?timeIdx=${index}`}
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
          );
        })}
    </div>
  );
};

export default Theater;
