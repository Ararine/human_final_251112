import { useEffect, useState } from "react";

import { getBodyHistory } from "../../api/BodyHistory";
import { GraphBox } from "../../components/GraphBox";

export default function BodyHistoryGraph({ userInfo }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 전체 변화 이력 불러오기
  const fetchHistory = async () => {
    if (!userInfo?.user_id) return;

    setLoading(true);
    setError("");

    try {
      const res = await getBodyHistory(userInfo.user_id);

      if (!res?.data || res.data.length === 0) {
        setError("변화 이력이 존재하지 않습니다.");
        setHistory([]);
        return;
      }

      setHistory(res.data);
    } catch (err) {
      console.error("변화 이력 불러오기 실패:", err);
      setError("변화 이력을 불러오는 중 오류가 발생했습니다.");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userInfo]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>신체 변화 그래프</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <>
          {/* 몸무게 그래프 */}
          <GraphBox title="체중 변화 (kg)" data={history} dataKey="weight" />

          {/* BMI 그래프 */}
          <GraphBox title="BMI 변화 (kg/m²)" data={history} dataKey="bmi" />

          {/* BMR 그래프 */}
          <GraphBox
            title="기초대사량 변화 (kcal)"
            data={history}
            dataKey="bmr"
          />
        </>
      )}
    </div>
  );
}
