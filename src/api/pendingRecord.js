import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;
export const getPendingRecord = async (id) => {
  try {
    const data = await axios.get(`${base_url}/pending-booking/${id}`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    return { status: false, message: "Failed to fetch show details" };
  }
};
