import { Box, Button, Dialog, Inset, Separator } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../api/movie";
import YouTube from "react-youtube";
import { IoMdClose } from "react-icons/io";
import { formatDuration } from "../utils/formatters";

const MovieDetails = () => {
  const movieId = useParams().id;
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [duration, setDuration] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
        setDuration(formatDuration(data.runtime))
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const data = await getMovieTrailer(movieId);
        setTrailer(data);
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };

    fetchMovieTrailer(movieId);
    fetchMovieDetails();
  }, [movieId]);

  console.log(movieDetails);
  
  return (
    <div className="w-2/3 m-auto mt-5 rounded-md bg-white shadow-sm h-full">
      <div className="w-full p-4">
        <div className="flex flex-row gap-5 h-fit">
          <div className="h-full">
            <Box className="mb-3 group relative w-fit">
              <Inset clip="padding-box" side="top" pb="current">
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
                      <IoMdClose
                        size={24}
                        className="text-gray-400 cursor-pointer"
                      />
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
              </Inset>
            </Box>
          </div>

          <div className="flex flex-col gap-4 w-full my-auto text-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-gray-800">
                {movieDetails?.title}
              </h1>
              <div className="flex flex-row gap-2 text-xs text-gray-500">
                <span>UA13+</span>
                <Separator orientation="vertical" />
                <span className="uppercase">
                  {movieDetails?.original_language}
                </span>
                <Separator orientation="vertical" />
                <span>{duration?.hours} hr {duration?.minutes} min</span>
              </div>
            </div>

            <div>
              <Button
                radius="large"
                color="gray"
                variant="outline"
                highContrast
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
        <Separator my="3" size="4" />
      </div>
    </div>
  );
};

export default MovieDetails;
