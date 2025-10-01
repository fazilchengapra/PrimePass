import API from "./api";

export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Email or password incorrect" };
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const res = await API.post("/auth/register", { username, email, password });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Register failed" };
  }
};

export const isMe = async () => {
  try {
    const res = await API.get("/auth/me");
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Register failed" };
  }
};

export const logOut = async () => {
  try {
    const res = await API.post("/auth/logout");
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Register failed" };
  }
};

export const googleAuth = async (code) => {
  console.log(code);
  
  const res = await API.post('/auth/googleOauth', {code})
  return res.data
}

export const verifyEmail = async (otp, email) => {
  try {
    const res = await API.post('/auth/verify-email', {otp, email})
    return res.data
  } catch (error) {
    throw error.response?.data || { message: "Verification failed" };
  }
}
