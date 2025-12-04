import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLatestBodyIndex } from "../../api/Bmi";

export default function Bmi({ userInfo }) {
  console.log(userInfo?.user_id);
  const navigate = useNavigate();

  const [bmi, setBmi] = useState("");
  const [bmr, setBmr] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 최신 BMI/BMR 불러오기
  // 최신 BMI/BMR 불러오기
  const fetchBodyIndex = async () => {
    if (!userInfo?.user_id) return; // 🔥 userInfo 없으면 실행 안 함

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
      // 🔥 userInfo 있을 때만 실행
      fetchBodyIndex();
    }
  }, [userInfo]);

  // 로딩 상태
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

      {/* 예시: 다른 페이지로 이동 버튼 */}
      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "20px", padding: "8px 16px" }}
      >
        홈으로
      </button>
    </div>
  );
}
