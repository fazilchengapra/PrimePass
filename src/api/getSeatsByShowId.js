import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;
export const getSeatsByShowId = async (showId) => {
  try {
    const data = await axios.get(`${base_url}/seats/layout/${showId}`);
    return data.data;
  } catch (error) {
    return { status: false, message: error.message };
  }
};
