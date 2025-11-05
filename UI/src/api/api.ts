import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 change if your backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
