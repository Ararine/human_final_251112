import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AttendanceCalendar({ attendanceDates = [], onClose }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const navigate = useNavigate();

  /* 🔥 streak 계산 */
  const getStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;

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

  const streak = getStreak(attendanceDates);
  const isReward = streak % 7 === 0 && streak > 0;

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
      attendanceDates.map((d) => new Date(d).toDateString())
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
    <div>
      <div className={`attend-modal modal-open`}>
        {/* streak bar */}
        <div className="streak-bar">
          <div style={{ width: `${(streak % 7) * (100 / 7)}%` }}></div>
        </div>

        <p className="streak-text">🔥 연속 {streak}일 출석 중!</p>

        {isReward && <div className="trophy-animation">🏆 7일 연속 달성!</div>}

        <p className="rank-text">
          현재 출석 랭킹: <b>{Math.floor(1000 / (streak + 1))}위</b>
        </p>

        <Calendar />

        <div>
          <button className="attend-btn" onClick={() => navigate("/exercise")}>
            운동하러 가기 ✔
          </button>
          <button className="close-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
