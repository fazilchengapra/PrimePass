import axios from "axios";

export const getPopularMovies = async () => {
  const apiKey = process.env.REACT_APP_TMDB;
  console.log("Using TMDB API Key:", apiKey); // ✅ Check if it's printing correctly

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching popular movies:", error.response?.data || error.message);
    throw error;
  }
};
