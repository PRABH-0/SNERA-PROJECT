import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});



API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user?.accessToken;
   const userId = user?.userId;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } 
  if (userId) {
    config.headers["UserId"] = userId;   // VERY IMPORTANT
  }
  return config;
});
 

export default API;
