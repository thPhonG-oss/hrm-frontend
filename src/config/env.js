/**
 * Environment Configuration
 * Centralized config cho toàn bộ ứng dụng
 */

const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8081/api/v1",

  // App Configuration
  APP_ENV: import.meta.env.VITE_APP_ENV || "development",
  IS_PRODUCTION: import.meta.env.VITE_APP_ENV === "production",
  IS_DEVELOPMENT: import.meta.env.VITE_APP_ENV === "development",

  // Features Flags
  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",

  // Timeout
  API_TIMEOUT: 30000, // 30s

  // Pagination
  DEFAULT_PAGE_SIZE: 20,

  // Token
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 phút trước khi expire
};

// Validation
if (!ENV.API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

// Log config ở development
if (ENV.IS_DEVELOPMENT) {
  console.log("🔧 Environment Config:", ENV);
}

export default ENV;
