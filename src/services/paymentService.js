import API from "./api";

export const createOrder = async (pendingRecordId) => {
  try {
    const res = await API.post("/payments/create-order", { pendingRecordId });
    return res
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
    try {
        const res = await API.post("payments/verify-payment", paymentData);
        return res;
    } catch (error) {
        throw error; 
    }
}