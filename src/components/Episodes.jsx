import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { getEpisodes } from "../api/series";
import { Button } from "@radix-ui/themes";

const Episodes = ({ showId, SeasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);
//   const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(20)

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        // setLoading(true);
        const res = await getEpisodes(showId, SeasonNumber);
        setEpisodes(res);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      } finally {
        // setLoading(false);
      }
    };

    if (showId && SeasonNumber !== undefined) {
      fetchEpisodes();
    }
  }, [showId, SeasonNumber]);


  if (episodes.length === 0) {
    return <p className="text-gray-500 text-sm">No episodes found.</p>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {episodes.slice(0, visible).map((e) => (
        <div
          key={e.id}
          className="grid grid-cols-12 gap-2 border p-2 rounded-md items-center"
        >
          {/* Episode Image */}
          <div className="col-span-4 lg:col-span-2 w-full">
            <img
              src={
                e.still_path
                  ? `https://image.tmdb.org/t/p/w500${e.still_path}`
                  : "https://andreaslloyd.dk/wp-content/themes/koji/assets/images/default-fallback-image.png"
              }
              alt={e.name || "Episode Poster"}
              className="w-auto h-auto object-cover rounded-md aspect-3/2"
              loading="lazy"
            />
          </div>

          {/* Episode Info */}
          <div className="col-span-8 lg:col-span-10 flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">
                <h4>{e.name || "Untitled Episode"}</h4>
              </div>
              {e?.runtime && <div className="text-xs text-gray-400">
                <span>{e.runtime || "Unknown"} minutes</span>
              </div>}
            </div>

            <div className="text-gray-500">
              <IoIosArrowForward size={25} />
            </div>
          </div>
        </div>
      ))}
      {visible < episodes?.length && (
      <Button onClick={() => setVisible(prev => prev+20)}>Load More</Button>
    )}
    </div>
  );
};

export default Episodes;
