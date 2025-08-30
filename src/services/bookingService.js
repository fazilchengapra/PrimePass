import API from "./api";

export const fetchBookingDetails = async (bookingId) => {
  try {
    const res = await API.get(`/order/${bookingId}`);
    return res.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to fetch booking details" }
    );
  }
};

export const fetchBookingHistory = async () => {
  try {
    const res = await API.get("/order/history");
    return res.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to fetch booking history" }
    );
  }
};
