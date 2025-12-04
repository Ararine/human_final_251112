import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceCheckPage from "../AttendanceCheckPage";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

export default function Home({ userInfo }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const images = ["/3.jpg", "/4.jpg", "/5.jpg"];
  const overay_text = ["aaaa", "bbb", "ccc"];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 🔥 로그인 + 출석 체크 통합 실행 함수
  const handleStart = () => {
    // 1) 로그인 여부 체크
    if (!userInfo) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    navigate("/exercise");

    // 4) 처음이면 → 출석 모달 띄우기
    setOpen(true);
  };
  return (
    <div className="home-container">
      <FirstSection
        images={images}
        texts={overay_text}
        handleStart={handleStart}
      />
      <SecondSection navigate={navigate} />
      <ThirdSection />
      {/* 🔥 출석 모달 */}
      {open && (
        <AttendanceCheckPage
          userInfo={userInfo}
          onClose={() => setOpen(false)}
        />
      )}
      <button className="floating-calendar-btn" onClick={() => setOpen(true)}>
        📅
      </button>
      {/* 
      {open && (
        <div className="calendar-modal-overlay" onClick={() => setOpen(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <AttendanceCheckPage
              userInfo={userInfo}
              onClose={() => setOpen(false)}
            />
            <button className="close-btn" onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
