import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

export const seatLock = async (data) => {
  try {
    const result = await axios.post(
      `${base_url}/pending-booking`,
      data,
      { withCredentials: true } // ✅ ensures cookies (JWT/session) are sent
    );
    
    return result.data;
  } catch (error) {
    console.error("Seat lock error:", error);
    throw error;
  }
};
