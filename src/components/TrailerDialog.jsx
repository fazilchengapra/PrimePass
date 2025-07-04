import { Dialog } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import YouTube from "react-youtube";
import { getMovieTrailer } from "../api/movie";

const TrailerDialog = ({ movieDetails, movieId }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const data = await getMovieTrailer(movieId);
        setTrailer(data);
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };

    fetchMovieTrailer();
  }, [movieId]);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div>
          <img
            className="rounded-2xl cursor-pointer h-44 w-40"
            src={`https://image.tmdb.org/t/p/w185/${movieDetails?.poster_path}`}
            alt={"nothing"}
            style={{
              backgroundColor: "var(--gray-5)",
            }}
          />
          <div className="absolute top-14 left-10">
            <div className="bg-gray-500 bg-opacity-60 p-4 m-auto rounded-full">
              <FaPlay size={16} className="text-white" />
            </div>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content className="p-0 h-auto w-[90vw] max-w-[800px] aspect-video bg-black">
        <Dialog.Title className="hidden">{movieDetails?.title}</Dialog.Title>
        <Dialog.Description size="2" mb="4" className="hidden">
          Make changes to your profile.
        </Dialog.Description>
        <Dialog.Close className="absolute top-2 right-2">
          <IoMdClose size={24} className="text-gray-400 cursor-pointer" />
        </Dialog.Close>
        <YouTube
          videoId={trailer?.key}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
            },
          }}
          className="w-full h-full rounded-lg"
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TrailerDialog;
