import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AttendanceCheckPage({ userInfo }) {
  const [attendedDates, setAttendedDates] = useState([]);
  const [closing, setClosing] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);
  const navigate = useNavigate();

  /* 🔥 오늘 이미 출석 모달을 본 경우 → 바로 운동 페이지로 이동 */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const visited = localStorage.getItem("attendanceCheckedDate");

    if (visited === today) {
      navigate("/exercise");
    }
  }, [navigate]);

  /* 🔥 streak 계산 */
  const getStreak = (dates) => {
    if (!dates.length) return 0;
    const sorted = [...dates].sort((a, b) => new Date(b) - new Date(a));
    let streak = 1;

    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = (prev - curr) / (1000 * 60 * 60 * 24);

      if (diff === 1) streak++;
      else break;
    }
    return streak;
  };

  const streak = getStreak(attendedDates);
  const isReward = streak % 7 === 0 && streak > 0;

  /* 🔥 모달 닫기 */
  const close = () => {
    setClosing(true);
    setTimeout(() => {
      navigate(-1);
    }, 250);
  };

  /* 🔥 임시 출석 처리 (백엔드 없이) */
  const handleAttendance = async () => {
    try {
      alert("출석 완료! (임시 처리)");

      // 오늘 날짜 기록 → 오늘은 다시 출석 모달 안 뜸
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem("attendanceCheckedDate", today);

      close();
      navigate("/exercise");
    } catch (err) {
      alert("출석 처리 오류");
    }
  };

  /* 📅 달력 렌더링 */
  const Calendar = () => {
    const today = new Date();
    const baseDate = new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      1
    );

    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const attendedSet = new Set(
      attendedDates.map((d) => new Date(d).toDateString())
    );

    const daysArray = [...Array(firstDay).fill(null)];
    for (let d = 1; d <= totalDays; d++) daysArray.push(d);

    return (
      <div>
        <div className="month-header">
          <button onClick={() => setMonthOffset(monthOffset - 1)}>◀</button>
          <span>
            {year}년 {month + 1}월
          </span>
          <button onClick={() => setMonthOffset(monthOffset + 1)}>▶</button>
        </div>

        <div className="cal-grid">
          {daysArray.map((day, idx) => {
            if (!day) return <div key={idx}></div>;

            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            const isAttended = attendedSet.has(date.toDateString());

            return (
              <div
                key={idx}
                className={`cal-day 
                  ${isToday ? "today-pulse" : ""} 
                  ${isAttended ? "attended-stamp" : ""}
                `}
              >
                <span className="day-number">{day}</span>
                {isAttended && <span className="stamp-big">🔥</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`attend-page-bg ${closing ? "fade-out" : "fade-in"}`}>
      <div className={`attend-modal ${closing ? "modal-close" : "modal-open"}`}>
        {/* streak bar */}
        <div className="streak-bar">
          <div style={{ width: `${(streak % 7) * (100 / 7)}%` }}></div>
        </div>
        <p className="streak-text">🔥 연속 {streak}일 출석 중!</p>

        {/* 보상 트로피 */}
        {isReward && <div className="trophy-animation">🏆 7일 연속 달성!</div>}

        {/* 출석 랭킹 */}
        <p className="rank-text">
          현재 출석 랭킹: <b>{Math.floor(1000 / (streak + 1))}위</b>
        </p>

        {/* 달력 */}
        <Calendar />

        <button className="attend-btn" onClick={handleAttendance}>
          출석하기 ✔
        </button>

        <button className="close-btn" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
}
