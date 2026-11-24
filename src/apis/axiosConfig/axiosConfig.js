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



api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      if (typeof config.headers?.delete === "function") {
        config.headers.delete("Content-Type");
      } else if (config.headers) {
        delete config.headers["Content-Type"];
      }
    } else if (config.headers && !config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);


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