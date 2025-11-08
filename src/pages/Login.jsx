import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 font-sans"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div
        className="w-96 p-10 rounded-lg"
        style={{
          boxShadow: "var(--shadow-custom)",
          background: "#ffffff",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đăng nhập HRM
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded text-white font-semibold"
            style={{
              backgroundImage: "var(--background-image-button-gradient)",
              boxShadow: "var(--shadow-custom)",
            }}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
