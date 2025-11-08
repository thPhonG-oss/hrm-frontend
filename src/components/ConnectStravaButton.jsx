import React from "react";
import api from "../api";

export default function ConnectStravaButton() {
  const handleConnect = async () => {
    try {
      const res = await api.get("/connect/strava");
      window.location.href = res.data.redirectUrl;
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối Strava");
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="w-full py-3 rounded text-white font-semibold"
      style={{
        backgroundImage: "var(--background-image-button-gradient)",
        boxShadow: "var(--shadow-custom)",
      }}
    >
      Kết nối Strava
    </button>
  );
}
