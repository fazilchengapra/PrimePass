import { Avatar, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import TrailerDialog from "./TrailerDialog";
import { FaTheaterMasks } from "react-icons/fa";
import { LiaLanguageSolid } from "react-icons/lia";
import { getCasts, getMovieVideos } from "../api/movie";
import EmptyState from "./ui/EmptyState";
import { useSelector } from "react-redux";
import { getTvCasts, getTvVideos } from "../api/series";

const TabsContent = ({ movieId, movieDetails }) => {
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const tool = useSelector(state => state?.search?.tool); // null → movie, value → series

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data =
          tool === "series"
            ? await getTvCasts(movieId)
            : await getCasts(movieId);
        setCast(data);
      } catch (error) {
        console.log("Error fetching cast details:", error);
      }
    };

    const fetchVideos = async (id) => {
      try {
        const data =
          tool === "series"
            ? await getTvVideos(movieId)
            : await getMovieVideos(movieId);
        setVideos(data);
      } catch (error) {
        console.log("Error fetching cast details:", error);
      }
    };

    fetchVideos();
    fetchCast();
  }, [movieId, tool]);

  return (
    <div className="overflow-y-auto h-[60vh] px-6 pb-6 suggestion-list">
      <Tabs.Content value="video" className="pt-3 w-full">
        {videos?.length > 0 ? (
          <TrailerDialog
            movieDetails={movieDetails}
            trailer={videos}
            poster={
              movieDetails?.belongs_to_collection?.poster_path ||
              movieDetails?.poster_path
            }
          />
        ) : (
          <EmptyState status={404} message={"Videos Not Found"} />
        )}
      </Tabs.Content>

      <Tabs.Content value="cast" className="pt-3">
        <div className="mt-2">
          {cast.length > 0 ? (
            <div>
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
                      src={`https://image.tmdb.org/t/p/w500/${d?.profile_path}`}
                      alt={d?.name}
                      fallback="A"
                    />
                    <div>
                      <p className="font-medium text-sm">{d?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState status={404} message={"Casts Not Found!"} />
          )}
        </div>
      </Tabs.Content>

      <Tabs.Content value="topic" className="pt-3">
        <h5 className="font-semibold mb-5">Overview</h5>
        <Text size="2" className="text-sm">
          {movieDetails?.overview}
        </Text>

        <div className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col gap-5">
            {movieDetails?.genres.length > 0 && (
              <div className="flex flex-row gap-2 items-center">
                <FaTheaterMasks size="25" />
                {movieDetails?.genres.map((genre, index) => (
                  <span className="text-sm text-black" key={genre.id}>
                    {genre?.name}
                    {index < movieDetails?.genres?.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}

            {movieDetails?.spoken_languages.length > 0 && (
              <div className="flex flex-row gap-2 items-center">
                <LiaLanguageSolid size="25" />
                {movieDetails?.spoken_languages?.map((language, index) => (
                  <span
                    className="text-sm text-black"
                    key={language?.id | index}
                  >
                    {language?.english_name}
                    {index < movieDetails?.spoken_languages?.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Tabs.Content>
    </div>
  );
};

export default TabsContent;
