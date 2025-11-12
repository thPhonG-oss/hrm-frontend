import api from "../api";

/**
 * Strava Integration Service
 */
class StravaService {
  /**
   * Get Strava authorization URL
   */
  async getAuthUrl() {
    const response = await api.get("/connect/strava");
    return response.data.redirectUrl;
  }

  /**
   * Check if user has connected Strava
   */
  async checkConnection() {
    try {
      const response = await api.get("/strava/connection");
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect Strava
   */
  async disconnect() {
    const response = await api.delete("/strava/connection");
    return response.data;
  }

  /**
   * Get athlete profile
   */
  async getProfile() {
    const response = await api.get("/strava/profile");
    return response.data;
  }

  /**
   * Get activities with pagination
   */
  async getActivities(page = 1, perPage = 20) {
    const response = await api.get("/strava/activities", {
      params: { page, per_page: perPage },
    });
    return response.data;
  }

  /**
   * Get activity details
   */
  async getActivityDetails(activityId) {
    const response = await api.get(`/strava/activities/${activityId}`);
    return response.data;
  }

  /**
   * Get leaderboard (running activities)
   */
  async getLeaderboard(startDate, endDate) {
    const response = await api.get("/strava/leaderboard", {
      params: { start_date: startDate, end_date: endDate },
    });
    return response.data;
  }
}

export default new StravaService();
