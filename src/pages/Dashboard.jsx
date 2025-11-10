import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConnectStravaButton from "../components/ConnectStravaButton";
import api from "../api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = localStorage.getItem("username");

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Step 4: Check query params sau khi Strava redirect về
    const stravaStatus = searchParams.get("strava");

    if (stravaStatus === "success") {
      setNotification({
        type: "success",
        message: "Kết nối Strava thành công!",
      });

      // Clear query params
      window.history.replaceState({}, "", "/dashboard");

      // Auto hide after 5s
      setTimeout(() => setNotification(null), 5000);
    } else if (stravaStatus === "error") {
      const errorMessage = searchParams.get("message") || "Có lỗi xảy ra";
      setNotification({
        type: "error",
        message: "Kết nối Strava thất bại: " + errorMessage,
      });

      // Clear query params
      window.history.replaceState({}, "", "/dashboard");

      // Auto hide after 5s
      setTimeout(() => setNotification(null), 5000);
    }
  }, [searchParams]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        fontFamily: "var(--font-montserrat)",
        background: "var(--background-image-custom-gradient2)",
      }}
    >
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div
        className="w-96 p-10 rounded-lg text-center space-y-6"
        style={{ boxShadow: "var(--shadow-custom)", background: "#ffffff" }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Dashboard HRM</h2>
        <p className="text-gray-600">
          Chào mừng <strong>{username}</strong>!
        </p>

        <ConnectStravaButton />

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded text-white font-semibold mt-4"
          style={{ background: "var(--color-custom-blue)" }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
