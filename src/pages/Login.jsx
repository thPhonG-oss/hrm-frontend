import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token khi vào login page
    localStorage.removeItem("accessToken");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || err.message || "Đăng nhập thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded text-white font-semibold disabled:opacity-50"
            style={{
              backgroundImage: "var(--background-image-button-gradient)",
              boxShadow: "var(--shadow-custom)",
            }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
