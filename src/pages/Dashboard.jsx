import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectStravaButton from "../components/ConnectStravaButton";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        fontFamily: "var(--font-montserrat)",
        background: "var(--background-image-custom-gradient2)",
      }}
    >
      <div
        className="w-96 p-10 rounded-lg text-center space-y-6"
        style={{ boxShadow: "var(--shadow-custom)", background: "#ffffff" }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Dashboard HRM</h2>
        <p className="text-gray-600">Chào mừng bạn đã đăng nhập!</p>
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
