import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceCheckPage from "./AttendanceCheckPage";
import "../css/home.css";

export default function Home({ userInfo }) {
  const images = ["/3.jpg", "/4.jpg", "/5.jpg"];
  const [current, setCurrent] = useState(0);
  const [showAttendance, setShowAttendance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  // ⭐ 출석 모달을 오늘 하루 한 번만 보이게 하는 로직
  const handleStart = () => {
    const today = new Date().toISOString().split("T")[0];
    const visited = localStorage.getItem("attendanceCheckedDate");

    if (visited === today) {
      // 오늘 이미 모달 봤으면 → 운동 페이지로 바로 이동
      navigate("/exercise");
    } else {
      // 오늘 처음이면 출석 모달 띄움
      setShowAttendance(true);
    }
  };
  return (
    <div className="home-container">
      {/* 🔥 히어로 배너 */}
      <div className="hero-section">
        <img
          src={images[current]}
          key={current}
          alt="banner"
          className="hero-image fade"
        />

        <div className="hero-center-box">
          <button
            className="start-btn"
            onClick={() => {
              if (!userInfo) {
                alert("로그인 후 이용해주세요.");
                navigate("/login");
                return;
              }
              setShowAttendance(true);
            }}
          >
            바로 시작하기
          </button>
        </div>

        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* 기존 섹션들 그대로 */}
      <div className="hero-text-box">
        <h1 className="hero-title">당신만을 위한 최적의 운동 루틴</h1>
        <p className="hero-desc">
          운동 추천부터 식단 분석, ROM까지—홈트의 모든 것을 한곳에서.
        </p>
      </div>

      {/* ⬇ ... 기존 내용 생략 ... */}

      {/* 🔥 출석 모달 */}
      {showAttendance && (
        <AttendanceCheckPage
          userInfo={userInfo}
          onClose={() => setShowAttendance(false)}
        />
      )}
    </div>
  );
}
