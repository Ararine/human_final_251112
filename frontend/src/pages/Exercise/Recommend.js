import React from "react";
import { useLocation } from "react-router-dom";

export default function Recommend() {
  const location = useLocation();
  const { recommendedData } = location.state || {};

  if (!recommendedData) return <p>추천 운동 데이터가 없습니다.</p>;

  return (
    <div className="recommend-container p-4">
      <h1 className="text-2xl font-bold mb-4">추천 운동</h1>

      {recommendedData["일자별_운동"].map((day, dayIdx) => (
        <div key={dayIdx} className="day-section mb-6">
          <h2 className="text-xl font-semibold mb-2">{day["날짜"]}</h2>
          <div className="exercise-list grid grid-cols-1 md:grid-cols-2 gap-4">
            {day["운동목록"].map((ex, exIdx) => (
              <div
                key={exIdx}
                className="exercise-card border rounded p-2 flex flex-col items-center gap-2"
              >
                <h3 className="font-semibold">{ex["운동명"]}</h3>
                <p>
                  세트: {ex["세트"]} | 반복: {ex["반복횟수"]}
                </p>
                <p>
                  난이도: {ex["난이도"]} | 휴식: {ex["휴식_초"]}초
                </p>
                <video
                  src={ex["link"]}
                  controls
                  autoPlay
                  muted
                  loop
                  width="250"
                  style={{ borderRadius: "8px" }}
                >
                  브라우저가 video 태그를 지원하지 않습니다.
                </video>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
