import API from "./api";

export const getShowDetails = async (movieId) => {
  try {
    const data = await API.get(`/show/${movieId}`)
    return data.data;
  } catch (error) {
    return {status: false, message: "Failed to fetch show details"};
  }
};