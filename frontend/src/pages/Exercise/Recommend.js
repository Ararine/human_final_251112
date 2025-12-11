import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Recommend() {
  const location = useLocation();
  const { recommendedData } = location.state || {};
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // 운동 카드 슬라이드 시작 인덱스

  if (!recommendedData) return <p>추천 운동 데이터가 없습니다.</p>;

  const days = recommendedData["일자별_운동"];
  const selectedDay = days[selectedDayIndex];
  const exercises = selectedDay["운동목록"];

  const visibleCount = 3; // 한 화면에 보여줄 운동 카드 수
  const endIndex = startIndex + visibleCount;
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0)); // 1칸 이동
  };

  const handleNext = () => {
    setStartIndex(
      (prev) => Math.min(prev + 1, exercises.length - visibleCount) // 한 칸 이동
    );
  };

  return (
    <div
      className="recommend-container flex-column gap-20"
      style={{ width: "80%", maxWidth: "80%", textAlign: "center" }}
    >
      <h1>추천 운동</h1>

      {/* 날짜 선택 버튼 */}
      <div className="flex-row gap-5">
        {days.map((day, idx) => (
          <div>
            <button
              key={idx}
              onClick={() => {
                setSelectedDayIndex(idx);
                setStartIndex(0); // 날짜 바뀌면 슬라이드 초기화
              }}
              className={` ${idx === selectedDayIndex ? " bg-lightgray" : ""}`}
            >
              {day["날짜"]}
            </button>
          </div>
        ))}
      </div>

      {/* 선택된 날짜의 운동 목록 */}
      <div>
        <div className="exercise-list flex-row gap-10">
          {exercises.slice(startIndex, endIndex).map((ex, exIdx) => (
            <div
              key={exIdx}
              className="flex flex-col"
              style={{
                flex: "1 1 0", // 균등 분할
                maxWidth: "calc((100% - 2 * 16px) / 3)", // gap 16px 기준 3등분
              }}
            >
              <h3>{ex["운동명"]}</h3>
              <p>
                세트: {ex["세트"]} | 반복: {ex["반복횟수"]}
              </p>
              <p>
                난이도: {ex["난이도"]} | 휴식: {ex["휴식_초"]}초
              </p>
              {ex["link"] ? (
                <video
                  src={ex["link"]}
                  controls
                  autoPlay
                  muted
                  loop
                  style={{
                    width: "100%",
                    height: "400px",
                    // objectFit: "contain", // 비율 유지, 남는 공간 여백 처리
                    objectFit: "cover", // 여백 없이 꽉 채움, 비율 유지 일부 짤림
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "#eee", // 영상이 없을 때 자리 표시
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                  }}
                >
                  영상 없음
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 이전/다음 버튼 */}
        <div className="flex-center">
          <button onClick={handlePrev} disabled={startIndex === 0}>
            이전
          </button>
          <button onClick={handleNext} disabled={endIndex >= exercises.length}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
