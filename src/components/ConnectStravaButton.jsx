import React, { useState } from "react";
import stravaService from "../services/strava.service";

export default function ConnectStravaButton() {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);

    try {
      const authUrl = await stravaService.getAuthUrl();
      window.location.href = authUrl;
    } catch (err) {
      console.error("Strava connection error:", err);
      alert(
        "Không thể kết nối Strava: " +
          (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="w-full py-3 rounded text-white font-semibold disabled:opacity-50"
      style={{
        backgroundImage: "var(--background-image-button-gradient)",
        boxShadow: "var(--shadow-custom)",
      }}
    >
      {loading ? "Đang kết nối..." : "Kết nối Strava"}
    </button>
  );
}
