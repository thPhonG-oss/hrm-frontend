import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function StravaCallback() {
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      axios
        .get(`http://localhost:8080/oauth2/callback/strava?code=${code}`)
        .then((res) => {
          alert("Kết nối Strava thành công!");
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Kết nối Strava thất bại!");
        });
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Đang xử lý kết nối Strava...</h2>
    </div>
  );
}
