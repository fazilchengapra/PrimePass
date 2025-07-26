import API from "./api";


export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
