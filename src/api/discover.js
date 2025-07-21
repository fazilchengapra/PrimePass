const API_KEY = process.env.REACT_APP_TMDB;
const BASE_URL = "https://api.themoviedb.org/3/discover/";

export const fetchFilteredMovies = async (filters, media) => {
    
  const isTV = media === "series"; // alias for 'tv'

  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    sort_by: filters.sort_by || "popularity.desc",
    with_original_language: filters.with_original_language || "",
    with_genres: filters.with_genres || "",
  });

  // Add year field conditionally
  if (filters.year) {
    query.append(
      isTV ? "first_air_date_year" : "primary_release_year",
      filters?.year
    );
  }

  const res = await fetch(`${BASE_URL}${isTV ? "tv" : "movie"}?${query}`);
  const data = await res.json();
  return data?.results || [];
};
