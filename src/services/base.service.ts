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

    // Nếu lỗi 401 và chưa từng thử refresh cho request này
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh.
        // Vì có withCredentials: true, trình duyệt sẽ tự mang refresh_token đi.
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // Sau khi refresh thành công, Backend đã set lại accessToken mới vào Cookie.
        // Bây giờ chỉ cần thực hiện lại request ban đầu.
        return baseApiClient(originalRequest);
      } catch (refreshError) {
        // Nếu ngay cả refresh token cũng hết hạn (ví dụ sau 7 ngày)
        // Xóa trạng thái đăng nhập và chuyển về trang Login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default baseApiClient;
