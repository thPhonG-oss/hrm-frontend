import api from "../api";

/**
 * Authentication Service
 * Tất cả logic liên quan đến auth
 */
class AuthService {
  /**
   * Login user
   */
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);
    const { accessToken, username, id, role } = response.data;

    // Save to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);

    return response.data;
  }

  /**
   * Register user
   */
  async register(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.clear();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken() {
    const response = await api.post("/auth/refresh");
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  }

  /**
   * Get current user info from localStorage
   */
  getCurrentUser() {
    return {
      accessToken: localStorage.getItem("accessToken"),
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role"),
    };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }
}

export default new AuthService();
