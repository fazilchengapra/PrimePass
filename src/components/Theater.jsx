import { Avatar, Button } from "@radix-ui/themes";
import { showtimes } from "../data/showtimes";
import { Link } from "react-router-dom";

const Theater = () => {
  return (
    <div className="flex flex-col gap-6">
      {showtimes.map((theater, idx) => (
        <div key={idx} className="flex flex-col gap-6">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              src="https://assetscdn1.paytm.com/images/cinema/IMP-36f03b60-4d50-11ee-98df-79f500af65e9.png?imwidth=56"
              size="5"
              radius="full"
              fallback="A"
            />
            <div className="flex flex-col gap-1 text-start">
              <div className="text-sm lg:text-md font-bold">
                <h4>{theater.theater}</h4>
              </div>
              <div className="text-xs font-semibold text-gray-500">
                <p>{theater.distance}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {theater.shows.map((time, showIdx) => (
              <Link to={`theater/${theater.id}/show?time=${time}`} key={showIdx}>
                <Button
                  key={showIdx}
                  color="gray"
                  variant="surface"
                  highContrast
                  className="py-6 px-4 lg:px-10 rounded-md"
                >
                  {time}
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
