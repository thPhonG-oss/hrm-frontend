import axios from "axios";
import ENV from "./config/env";

/**
 * Axios Instance với full configuration
 */
const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: ENV.API_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * - Thêm access token vào header
 * - Log request ở development
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request ở development
    if (ENV.IS_DEVELOPMENT) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Auto refresh token khi 401
 * - Log response ở development
 * - Handle common errors
 */
api.interceptors.response.use(
  (response) => {
    // Log response ở development
    if (ENV.IS_DEVELOPMENT) {
      console.log(
        `📥 ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error ở development
    if (ENV.IS_DEVELOPMENT) {
      console.error(
        `❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`,
        {
          status: error.response?.status,
          data: error.response?.data,
        }
      );
    }

    // Handle 401 - Auto Refresh Token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${ENV.API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại → Logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle Network Error
    if (!error.response) {
      console.error("🌐 Network Error: Unable to connect to server");
      return Promise.reject(new Error("Không thể kết nối đến server"));
    }

    return Promise.reject(error);
  }
);

export default api;
