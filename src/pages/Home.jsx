import React from "react";
import ConnectStravaButton from "../components/ConnectStravaButton";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Ứng dụng HRM - Tích hợp Strava</h1>
      <p>Kết nối tài khoản Strava để đồng bộ hoạt động chạy bộ</p>
      <ConnectStravaButton />
    </div>
  );
}
