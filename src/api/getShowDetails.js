import axios from "axios";
const base_url = process.env.REACT_BASE_URL

export const getShowDetails = async (movieId) => {
  try {
    const data = await axios.get(`http://localhost:5000/api/show/${movieId}`)
    return data.data;
  } catch (error) {
    return {status: false, message: "Failed to fetch show details"};
  }
};
