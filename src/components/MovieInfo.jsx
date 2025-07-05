import { Avatar, Box, Button, Dialog, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { getCasts, getMovieVideos } from "../api/movie";
import TrailerDialog from "./TrailerDialog";
import { FaTheaterMasks } from "react-icons/fa";
import { LiaLanguageSolid } from "react-icons/lia";


const MovieInfo = ({ movieId, movieDetails }) => {
  console.log(movieDetails);

  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getCasts(movieId);
        setCast(data);
      } catch (error) {
        console.log("Error fetching cast details:", error);
      }
    };

    const fetchVideos = async (id) => {
      try {
        const data = await getMovieVideos(movieId);
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.log("Error fetching cast details:", error);
      }
    };

    fetchVideos();
    fetchCast();
  }, [movieId]);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button radius="large" color="gray" variant="outline" highContrast>
          View Details
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-1/2 max-h-[80vh] overflow-hidden p-0">
        <Tabs.Root defaultValue="video">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-3">
            <Dialog.Title>Movie Details</Dialog.Title>
            <Dialog.Description size="1">
              {movieDetails?.title}
            </Dialog.Description>
            <Dialog.Close className="absolute top-6 right-10">
              <div className="p-2 rounded-full bg-gray-200">
                <IoMdClose size={18} className="text-black cursor-pointer" />
              </div>
            </Dialog.Close>

            {/* Tabs must be inside Tabs.Root */}
            <Tabs.List className="mt-4">
              <Tabs.Trigger value="video">Videos</Tabs.Trigger>
              <Tabs.Trigger value="cast">Cast</Tabs.Trigger>
              <Tabs.Trigger value="topic">Topic</Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto h-[60vh] px-6 pb-6 scrollbar-hide">
            <Tabs.Content value="video" className="pt-3 w-full">
              {videos.length > 0 && (
                <TrailerDialog
                  movieDetails={movieDetails}
                  trailer={videos}
                  poster={
                    movieDetails?.belongs_to_collection?.poster_path ||
                    movieDetails?.poster_path
                  }
                />
              )}
            </Tabs.Content>

            <Tabs.Content value="cast" className="pt-3">
              <div className="mt-2">
                <div className="font-semibold">Cast</div>
                <div className="mt-5 flex flex-row gap-5 flex-wrap">
                  {cast.map((d) => (
                    <div
                      key={d.id}
                      className="flex flex-col gap-2 items-center w-fit m-auto"
                    >
                      <Avatar
                        size="5"
                        radius="full"
                        src={`https://image.tmdb.org/t/p/w500/${d.profile_path}`}
                        alt={d.name}
                        fallback="A"
                      />
                      <div>
                        <p className="font-medium text-sm">{d.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="topic" className="pt-3">
              <h5 className="font-semibold mb-5">Overview</h5>
              <Text size="2" className="text-sm">
                {movieDetails?.overview}
              </Text>

              <div className="flex flex-col gap-4 mt-10">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row gap-2 items-center">
                    <FaTheaterMasks size="25" />
                    {movieDetails?.genres.map((genre, index) => (
                      <span className="text-sm text-black" key={genre.id}>
                        {genre.name}
                        {index < movieDetails.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-row gap-2">
                    <LiaLanguageSolid  size="25" />
                    {movieDetails?.spoken_languages.map((language, index) => (
                      <span className="text-sm text-black" key={language.id}>
                        {language.name}
                        {index < movieDetails.spoken_languages.length - 1 &&
                          ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default MovieInfo;
