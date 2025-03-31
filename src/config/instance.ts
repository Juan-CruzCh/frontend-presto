import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  return Cookies.get("token");
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
