import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9999",
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instance;
