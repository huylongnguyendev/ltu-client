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

    // ĐIỀU KIỆN QUAN TRỌNG:
    // Nếu API đang lỗi là 'refresh' hoặc 'me' thì DỪNG NGAY, không retry nữa.
    if (
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/me")
    ) {
      return Promise.reject(error);
    }

    // Chỉ chạy logic refresh cho các API khác (ví dụ: /skills,)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi refresh token
        await baseApiClient.post("/auth/refresh");
        // Thử lại request ban đầu
        return baseApiClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng hỏng (401), thì xóa user và đẩy về login (nếu cần)
        // store.user.getState().setUser(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default baseApiClient;
