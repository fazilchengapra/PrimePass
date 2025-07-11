import axios from "axios";
const apiKey = process.env.REACT_APP_TMDB;

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching popular movies:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const upcomingMovies = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB}&language=en-US&page=1&region=IN`
    );
    console.log(res.data.results.filter(data => data?.poster_path));
    
    return res.data.results.filter(data => data?.poster_path)
  } catch (error) {
    console.error(
      "Error fetching upcoming movies:",
      error.response?.data || error.message
    );
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB}&language=en-US`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching movie details:", error.response);
  }
};

export const getMovieTrailer = async (id) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB}&language=en-US`
    );
    const trailer = res.data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer;
  } catch (error) {
    console.log("Error fetching movie trailer:", error.response);
  }
};

export const getCasts = async (id) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB}`
    );
    const actors = res.data.cast.filter(
      (actor) =>
        actor.known_for_department === "Acting" && // Only real actors
        actor.profile_path && // Has image
        actor.character // Top 10 by importance
    );
    return actors;
  } catch (error) {
    console.log("Error fetching movie casts:", error.response);
  }
};

export const getMovieVideos = async (id) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB}&language=en-US`
    );
    return res.data.results.slice(0, 5);
  } catch (error) {
    console.error(
      "Error fetching movie videos:",
      error.response?.data || error.message
    );
  }
};
