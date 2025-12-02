import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AttendanceCalendar from "../../components/AttendanceCalendar";
// import { Attendance } from "../../api/Attendance";

const Admin = ({ userInfo }) => {
  console.log(userInfo);
  const [attendedDates, setAttendedDates] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // const res = await Attendance(userInfo.user_id);
        // const dates = res.data.map((item) => new Date(item.attended_at));
        // setAttendedDates(dates);
        alert("출석처리되었습니다.");
      } catch (error) {
        if (error.status == 409) {
          if (error?.response?.data?.data) {
            const dates = error.response.data.data.map(
              (item) => new Date(item.attended_at)
            );
            setAttendedDates(dates);
          }
          alert("이미 출석하였습니다.");
        } else {
          console.error("출석 조회  g실패:", error);
        }
      }
    };
    fetchAttendance();
  }, []);
  return (
    <div className="admin-container">
      <h2 className="admin-title">관리자 페이지</h2>

      <div className="admin-grid-2x2">
        <Link to="/admin/ex" className="admin-card">
          <h3>🏋️ 운동 관리</h3>
          <p>운동 목록 추가, 수정 및 삭제</p>
        </Link>

        <Link to="/admin/meal" className="admin-card">
          <h3>🍱 식단 관리</h3>
          <p>식단 데이터 관리</p>
        </Link>

        <Link to="/admin/user" className="admin-card">
          <h3>👤 사용자 관리</h3>
          <p>회원 정보 조회 및 제재 설정</p>
        </Link>

        <Link to="/admin/post" className="admin-card">
          <h3>📝 게시글 관리</h3>
          <p>커뮤니티 게시글 검토 및 관리</p>
        </Link>
      </div>
      {/* <AttendanceCalendar attendedDates={attendedDates} /> */}
    </div>
  );
};

export default Admin;
