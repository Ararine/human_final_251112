import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomVideo from "./RandomVideo";
import {
  recommendedCurriculum,
  getRecommendedCurriculum,
  deleteRecommendedCurriculum,
} from "../../api/exercise";
import URL from "../../constants/url";
export default function Exercise() {
  const navigate = useNavigate();

  // 선택값
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // 5분 ~ 180분까지 10분 간격 리스트 생성
  const timeOptions = [];
  for (let t = 5; t <= 180; t += 10) {
    timeOptions.push(t);
  }

  // 예시 운동 리스트
  const exercises = [
    {
      name: "스트레칭_상체",
      video: "http://localhost/data/스트레칭_상체.mp4",
    },
    { name: "스트레칭_하체", video: "http://localhost/data/스트레칭_하체.mp4" },
    {
      name: "스트레칭_하체",
      video: "http://localhost/data/스트레칭_하체2.mp4",
    },
  ];

  const handleRecommend = async () => {
    if (!days || !time) return;
    setLoading(true);

    try {
      // API 호출
      const response = await recommendedCurriculum(days, time);
      const recommendedData = response.results;
      // 다음 페이지로 이동하면서 데이터 전달
      navigate(`${URL.EXERCISE_URL}/recommend`, { state: { recommendedData } });
    } catch (err) {
      console.error("추천 운동 호출 실패:", err);
      alert("추천 운동을 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteRecommendedCurriculum();
      alert("기본 커리큘럼이 삭제되었습니다.");
    } catch (err) {
      console.error("기본 커리큘럼 삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurriculum = async () => {
    setLoading(true);
    try {
      const res = await getRecommendedCurriculum();
      let recommendedData = res?.results;

      // 객체가 들어올 수도 있으니 항상 배열로 변환
      const dataArray = recommendedData
        ? Array.isArray(recommendedData)
          ? recommendedData
          : [recommendedData]
        : [];
      if (dataArray.length > 0) {
        recommendedData = dataArray[0];

        // 알림창 띄우기
        const goToRecommend = window.confirm(
          "기본 커리큘럼이 있습니다. 추천 페이지로 이동하시겠습니까?\n취소를 누르면 삭제하시겠습니까?"
        );

        if (goToRecommend) {
          navigate(`${URL.EXERCISE_URL}/recommend`, {
            state: { recommendedData },
          });
        } else {
          handleDelete();
        }
      }
    } catch (err) {
      console.error("추천 커리큘럼 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <RandomVideo data={exercises} />

      <div className="exercise-container w-full max-w-xl px-4">
        {/* ---- 기간 입력 ---- */}
        <section className="exercise-section mb-6">
          <h2 className="section-title">운동 가능 기간 선택</h2>
          <div className="input-wrap mt-2">
            <input
              type="number"
              min="1"
              max="31"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="며칠 동안 운동하나요? (1~31일)"
              className="day-input border rounded px-2 py-1 w-full"
            />
          </div>
        </section>

        {/* ---- 운동 시간 선택 ---- */}
        <section className="exercise-section mb-6">
          <h2 className="section-title">하루 운동 가능 시간 선택</h2>
          <div className="input-wrap mt-2">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="time-select border rounded px-2 py-1 w-full"
            >
              <option value="">운동 시간 선택</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}분
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ---- 추천 운동 생성 ---- */}
        <section className="exercise-section mb-6">
          <h2 className="section-title">맞춤 운동 생성</h2>
          <div className="recommend-box mt-2 flex flex-col items-center gap-2">
            <p className="recommend-text text-center">
              운동 기간과 운동 시간을 입력하여 맞춤 운동을 생성하세요.
            </p>
            <button
              className="recommend-btn bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
              disabled={!days || !time || loading}
              onClick={handleRecommend}
            >
              {loading ? "추천 운동 생성중..." : "맞춤 운동 생성하기"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
