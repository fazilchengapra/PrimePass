import { Box, Inset } from "@radix-ui/themes";
import { MdOutlineArrowOutward } from "react-icons/md";

const Card = ({ card }) => {
  return (
    <div className="shrink-0 w-auto lg:w-full">
      <Box className="mb-3 group relative">
        <Inset clip="padding-box" side="top" pb="current">
          <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-gray-300">
            <img
              className="w-full h-full object-cover transition duration-300 group-hover:brightness-75 cursor-pointer"
              src={`https://image.tmdb.org/t/p/original/${card.poster_path}`}
              alt={card.title}
            />
          </div>
          <div className="absolute top-3 right-[8%]  opacity-0 group-hover:opacity-100 transition duration-300 text-white">
            <MdOutlineArrowOutward size={22} />
          </div>
        </Inset>
      </Box>
    </div>
  );
};

export default Card;
