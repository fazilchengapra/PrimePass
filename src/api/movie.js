import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB;
const apiKey = process.env.REACT_APP_TMDB;

export async function getAllTimePopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=10000&api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results
}

export const getProviders = async (movieId, showError) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
    );
    const providers = res.data.results.IN;
    if (!providers) return null;
    return {
      flatrate: providers.flatrate || [],
      rent: providers.rent || [],
      buy: providers.buy || [],
      link: providers.link,
    };
  } catch (error) {
    console.log("Providers Error: " + error);
    showError?.("providers error");
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();
    return data.results.slice(0, 6);
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (query) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await res.json();
    return data.results
      .filter((m) => m.poster_path) // only include movies that have poster_path
      .slice(0, 6);
  } catch (error) {
    console.log("search movie api error:");
  }
};

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
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=IN`
    );

    return res.data.results.filter((data) => data?.poster_path);
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
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching movie details:", error.response);
  }
};

export const getMovieTrailer = async (id) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const trailer = res.data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer;
  } catch (error) {
    console.log("Error fetching movie trailer:", error.response);
    return [];
  }
};

export const getCasts = async (id) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
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
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return res.data.results.slice(0, 5);
  } catch (error) {
    console.error(
      "Error fetching movie videos:",
      error.response?.data || error.message
    );
  }
};
