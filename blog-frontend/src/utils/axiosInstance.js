import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8000/api/v1" });

axiosInstance.interceptors.request.use((req) => {
    const stringifySessionData = window.localStorage.getItem("sessionData");

    if (stringifySessionData) {
        const sessionData = JSON.parse(stringifySessionData);
        const token = sessionData.token;
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})

export default axiosInstance;