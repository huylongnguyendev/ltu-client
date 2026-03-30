import axios from "axios";
import Cookies from "js-cookie";

const baseApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Bắt buộc để trình duyệt tự gửi cả 2 cookie
});

baseApiClient.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default baseApiClient;
