import { Box, Inset } from "@radix-ui/themes";
import { MdOutlineArrowOutward } from "react-icons/md";

const Card = ({ card }) => {
  return (
    <div className="shrink-0 w-auto lg:w-full">
      <Box className="mb-3 group relative">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            className="rounded-2xl w-auto lg:w-44 transition duration-300 group-hover:brightness-75 cursor-pointer"
            src={`https://image.tmdb.org/t/p/w185/${card.poster_path}`}
            alt={card.title}
            style={{
              backgroundColor: "var(--gray-5)",
            }}
          />
          <div className="absolute top-3 lg:top-2 right-[10%] lg:right-8 opacity-0 group-hover:opacity-100 transition duration-300 text-white">
            <MdOutlineArrowOutward size={22} />
          </div>
        </Inset>
      </Box>
    </div>
  );
};

export default Card;
