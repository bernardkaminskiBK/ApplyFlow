import axios from "axios";
import { isTokenExpired } from "../features/auth/utils/authToken";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosClient = axios.create({
  baseURL: apiBaseUrl,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
  }

  return config;
});
