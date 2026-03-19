import axios from "axios";

const baseApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Bắt buộc để trình duyệt tự gửi cả 2 cookie
});

baseApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // CHỈ xử lý nếu lỗi là 401 (Unauthorized) và KHÔNG PHẢI là request đang check auth
    if (
      error.response?.status === 401 &&
      !originalRequest._url?.includes("/auth/me")
    ) {
      // Nếu có logic Refresh Token thì chạy ở đây
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await baseApiClient.post("/auth/refresh");
          return baseApiClient(originalRequest); // Thử lại request cũ
        } catch (refreshError) {
          // Nếu refresh cũng hỏng, chỉ cần xóa User trong Store, TUYỆT ĐỐI không reload
          // store.user.getState().setUser(null);
          return Promise.reject(refreshError);
        }
      }
    }

    // Nếu là chính API /auth/me bị 401, trả về lỗi để RootDocument xử lý im lặng
    return Promise.reject(error);
  },
);

export default baseApiClient;
