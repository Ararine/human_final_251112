import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AttendanceCalendar = ({ attendedDates = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleCalendar = () => setIsOpen(!isOpen);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const found = attendedDates.find(
        (d) => d.toDateString() === date.toDateString()
      );
      return found ? "attended" : null;
    }
  };

  return (
    <div>
      <h3>출석 달력</h3>
      <button onClick={toggleCalendar} style={{ marginBottom: "8px" }}>
        {isOpen ? "달력 접기" : "달력 펼치기"}
      </button>
      {isOpen && <Calendar tileClassName={tileClassName} />}
      <style>{`
    .attended {
        background-color: #28a745 !important;
        color: white !important;
        margin: 4px;
        border-radius: 8%;
    }
    `}</style>
    </div>
  );
};

export default AttendanceCalendar;
