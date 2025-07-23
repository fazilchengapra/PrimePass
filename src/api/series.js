import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB;

export const getSeriesByQuery = async (query) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}`
    );

    return res.data.results.filter((series) => series.poster_path);
  } catch (error) {
    console.log("query series fetch error");
  }
};

export const getAiringTVSeries = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results.filter((series) => series.poster_path).slice(0, 6); // Array of currently airing TV shows
  } catch (error) {
    console.error("Error fetching airing series:", error);
  }
};

export const getTVSeriesById = async (seriesId) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching TV series:", error);
  }
};

export const getEpisodes = async (show_id, season_number) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${show_id}/season/${season_number}?api_key=${API_KEY}`
    );
    return res.data.episodes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTvTrailer = async (showId) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${API_KEY}`
    );
    const trailer = res.data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer;
  } catch (error) {
    console.log(error);
  }
};

export const getTvVideos = async (showId) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${API_KEY}`
    );
    return res.data.results;
  } catch (error) {
    console.log("Tv Videos Get error: ", error);
  }
};

export const getTvCasts = async (showId) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${API_KEY}`
    );
    const casts = res.data.cast.filter(
      (cast) =>
        cast.known_for_department === "Acting" && // Only real actors
        cast.profile_path && // Has image
        cast.character // Top 10 by importance
    );
    return casts;
  } catch (error) {
    console.log(error);
  }
};
