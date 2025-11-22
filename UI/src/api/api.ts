import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:44300/api",
  headers: {
    "Content-Type": "application/json",
  },
});



API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default API;
