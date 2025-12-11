import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceCalendar from "../../components/AttendanceCalendar";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import { Attendance } from "../../api/Attendance";
import RomInfo from "./RomInfo";

export default function Home({ userInfo }) {
  const [open, setOpen] = useState(false);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const navigate = useNavigate();
  const images = ["/3.jpg", "/4.jpg", "/5.jpg"];
  const overay_text = [
    "ROM 분석으로 더 안전한 자세 교정",
    "ROM으로 내 몸이 가장 편한 움직임 범위를 찾기",
    "ROM에 맞춘 동작으로, 누구나 자신의 몸 상태에 맞는 운동을",
  ];

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
  const handleCalendar = async () => {
    try {
      const res = await Attendance(userInfo.user_id);
      let data = res.data;
      data = data.map((item) => item.attended_at);
      setAttendanceDates(data);
      setOpen(true);
    } catch (err) {
      if (err?.response?.status == 409) {
        let data = err.response.data?.data;
        data = data.map((item) => item.attended_at);
        setAttendanceDates(data);
        setOpen(true);
      } else {
        console.log(err);
        alert("출석 처리에 실패하였습니다.");
      }
    }
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
      <RomInfo />
      {userInfo && (
        <button className="floating-calendar-btn" onClick={handleCalendar}>
          📅
        </button>
      )}

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AttendanceCalendar
              userInfo={userInfo}
              attendanceDates={attendanceDates}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
