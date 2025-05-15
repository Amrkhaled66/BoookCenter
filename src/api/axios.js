import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const axiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export { axiosPrivate,axiosAdmin };
export default axiosInstance;
