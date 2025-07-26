import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // VERY IMPORTANT for cookies
});

export default API;
