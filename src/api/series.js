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
    return data.results.filter((series) => series.poster_path); // Array of currently airing TV shows
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
