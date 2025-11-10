import React, { useState } from "react";
import api from "../api";

export default function ConnectStravaButton() {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      // Step 1: Gọi backend để lấy Strava authorization URL
      const res = await api.get("/connect/strava");

      // Step 2: Redirect user đến Strava
      window.location.href = res.data.redirectUrl;
    } catch (err) {
      console.error("Error connecting to Strava:", err);
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
