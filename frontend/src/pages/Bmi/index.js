import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLatestBodyIndex } from "../../api/Bmi";

export default function Bmi({ userInfo }) {
  const navigate = useNavigate();

  const [bmi, setBmi] = useState("");
  const [bmr, setBmr] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 최신 BMI/BMR 불러오기
  const fetchBodyIndex = async () => {
    if (!userInfo?.user_id) return;

    setLoading(true);
    setError("");
    try {
      const res = await getLatestBodyIndex(userInfo.user_id);
      const data = res?.data[0];

      if (!data) {
        setError("데이터가 존재하지 않습니다.");
        setBmi("");
        setBmr("");
        return;
      }

      setBmi(data?.bmi ?? "");
      setBmr(data?.bmr ?? "");
    } catch (err) {
      console.error("BMI/BMR 불러오기 실패:", err);
      setError("BMI/BMR 데이터를 불러오지 못했습니다.");
      setBmi("");
      setBmr("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.user_id) {
      fetchBodyIndex();
    }
  }, [userInfo]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>BMI/BMR 지수</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <>
          <p>BMI: {bmi}</p>
          <p>BMR: {bmr} kcal</p>
        </>
      )}

      <h3
        style={{
          marginTop: "30px",
          fontSize: "0.8rem", // 30% 축소
          fontWeight: "600",
        }}
      >
        BMI 기준표 (대한비만학회)
      </h3>

      <table
        className="bmi-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>저체중</th>
            <th style={thStyle}>정상</th>
            <th style={thStyle}>비만전단계</th>
            <th style={thStyle}>1단계 비만</th>
            <th style={thStyle}>2단계 비만</th>
            <th style={thStyle}>3단계 비만</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>18.5kg/m² 미만</td>
            <td style={tdStyle}>18.5 ~ 22.9kg/m²</td>
            <td style={tdStyle}>23 ~ 24.9kg/m²</td>
            <td style={tdStyle}>25 ~ 29.9kg/m²</td>
            <td style={tdStyle}>30 ~ 34.9kg/m²</td>
            <td style={tdStyle}>35kg/m² 이상</td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: "8px", fontSize: "12px", color: "#555" }}>
        (출처: 2020 대한비만학회 진료지침)
      </p>

      {/* 페이지 이동 버튼 */}
      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "20px", padding: "8px 16px" }}
      >
        홈으로
      </button>
    </div>
  );
}

// 스타일 분리
const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#f3f6fa",
  fontWeight: "600",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#fff",
};
