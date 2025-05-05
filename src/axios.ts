import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instance;
