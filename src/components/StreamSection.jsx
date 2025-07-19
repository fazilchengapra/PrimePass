import { Button } from "@radix-ui/themes";
import { IoMdVideocam } from "react-icons/io";
import { Link } from "react-router-dom";

const StreamSection = ({ data, title, link }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full">
        <h3 className="text-lg font-bold text-black">{title}</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {data?.map((provider) => (
          <div className="flex flex-col gap-4 p-2 border rounded-md">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-16 h-16">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider?.logo_path}`}
                  className="object-contain w-full h-full rounded-md"
                  alt={provider?.provider_name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold text-black">
                  <span>{provider?.provider_name}</span>
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  <span>Available</span>
                </div>
              </div>
            </div>

            {/* watch button */}
            <div className="w-full">
              <Link to={link}>
                <Button size="2" variant="surface" className="w-full">
                  <IoMdVideocam /> Watch
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamSection;
