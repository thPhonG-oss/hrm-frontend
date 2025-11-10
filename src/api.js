import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api/v1", // Thêm /api/v1
  withCredentials: true, // Quan trọng: Cho phép gửi cookies
});

// Request interceptor - Thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Tự động refresh token khi 401
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token (refreshToken được lấy từ cookie tự động)
        const response = await axios.post(
          "http://localhost:8081/api/v1/auth/refresh",
          {}, // Backend lấy refreshToken từ cookie, không cần gửi trong body
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        // Lưu access token mới
        localStorage.setItem("accessToken", accessToken);

        // Retry request ban đầu với token mới
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token thất bại, redirect về login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
