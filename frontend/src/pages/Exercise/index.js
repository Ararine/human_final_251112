import React from "react";
import { useNavigate } from "react-router-dom";

export default function Exercise() {
  const navigate = useNavigate();

  const timeOptions = [
    { time: "10분", path: "/exercise/10min" },
    { time: "20분", path: "/exercise/20min" },
    { time: "30분", path: "/exercise/30min" },
    { time: "45분", path: "/exercise/45min" },
  ];

  const programs = [
    {
      title: "1주 체형교정 프로그램",
      desc: "유연성 + ROM 개선",
      path: "/exercise/program/1week",
    },
    {
      title: "2주 전신 다이어트 챌린지",
      desc: "초보자용 · 매일 20분",
      path: "/exercise/program/2week",
    },
    {
      title: "4주 근력 강화 프로젝트",
      desc: "중급자용 · 주 4회",
      path: "/exercise/program/4week",
    },
  ];

  return (
    <div className="exercise-container">
      <section className="exercise-section">
        <h2 className="section-title">오늘의 추천 운동</h2>
        <div className="recommend-box">
          <p className="recommend-text">
            당신의 목표에 기반한 맞춤 추천 운동입니다.
          </p>
          <button
            className="recommend-btn"
            onClick={() => navigate("/exercise/recommend")}
          >
            추천 운동 시작
          </button>
        </div>
      </section>

      <section className="exercise-section">
        <h2 className="section-title">시간으로 빠르게 선택</h2>

        <div className="time-card-wrap">
          {timeOptions.map((item, idx) => (
            <div
              key={idx}
              className="time-card"
              onClick={() => navigate(item.path)}
            >
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="exercise-section">
        <h2 className="section-title">프로그램 · 챌린지</h2>

        <div className="program-card-wrap">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className="program-card"
              onClick={() => navigate(item.path)}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
