import { getPopularMovies } from "../api/movie";
import { getAiringTVSeries } from "../api/series";

export const getBannerData = async () => {
  const result = [];

  try {
    // Get 2 popular movies with backdrops
    const movieRes = await getPopularMovies();
    const movies = movieRes?.results
      ?.filter((m) => m.backdrop_path)
      .slice(0, 2);
    result.push(...movies); // push both movies
  } catch (error) {
    console.log("banner movie fetching issue", error);
  }

  try {
    // Get 2 popular shows with backdrops
    const showRes = await getAiringTVSeries();
    const shows = showRes?.filter((s) => s.backdrop_path).slice(0, 2);
    result.push(...shows); // push both shows
  } catch (error) {
    console.log("banner show fetching issue", error);
  }
  return result;
};
