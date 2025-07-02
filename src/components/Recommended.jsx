import { Box, Inset, Text } from "@radix-ui/themes";
import React, { useState } from "react";

const Recommended = () => {
  // Example rating per movie card, use state to manage it per movie
  const [rating, setRating] = useState(5);

  return (
    <div className="mt-4 px-10 mx-5 rounded-md h-fit shadow-md bg-white mb-20">
      <div className="text-xl font-bold text-start pt-5">Recommended Movies</div>
      <div className="grid grid-cols-6 mt-3">
        <Box className="mb-5">
          <Inset clip="padding-box" side="top" pb="current">
            <img
              className="rounded-2xl w-44"
              src="https://image.tmdb.org/t/p/w185/hBH50Mkcrc4m8x73CovLmY7vBx1.jpg"
              alt="Bold typography"
              style={{
                display: "block",
                objectFit: "cover",
                backgroundColor: "var(--gray-5)",
              }}
            />
          </Inset>
          <div className="flex flex-col gap-2 mt-3 w-5/6">
            <Text size="2" className="text-start font-semibold">
              The Bold Type
            </Text>
            <Text size="1" className="text-start text-[#636363]">
              A look into the lives of three friends working
            </Text>

            {/* ⭐ Star Rating Section */}
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xl cursor-pointer transition ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Recommended;
