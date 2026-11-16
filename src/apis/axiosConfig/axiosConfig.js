import axios from "axios";
import { handleAxiosError } from "./errorHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/",
  withCredentials: true, // HttpOnly Cookies 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response Interceptor 
api.interceptors.response.use(
  (response) => response,
  (error) => {
   //Error Logic
    const normalizedError = handleAxiosError(error);

    return Promise.reject(normalizedError);
  }
);

export default api;