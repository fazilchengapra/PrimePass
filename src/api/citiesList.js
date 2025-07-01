import axios from "axios";

export const getCities = async () =>
  axios.post("https://countriesnow.space/api/v0.1/countries/states", {
    country: "India",
  });
