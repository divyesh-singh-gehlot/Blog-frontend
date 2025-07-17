import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
  const stringifySessionData = window.localStorage.getItem("sessionData");

  if (stringifySessionData) {
    const sessionData = JSON.parse(stringifySessionData);
    const token = sessionData.token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axiosInstance;
