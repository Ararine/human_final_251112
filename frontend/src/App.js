// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import URL from "./constants/url";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import Meal from "./pages/Meal";
import Community from "./pages/Community";
import CommunityWrite from "./pages/Community/Write";
import CommunityRead from "./pages/Community/Read";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ROM from "./pages/ROM";
import AttendanceCheckPage from "./pages/AttendanceCheckPage";

import Admin from "./pages/Admin";
import AdminExercise from "./pages/Admin/Exercise";
import AdminMeal from "./pages/Admin/Meal";
import AdminUser from "./pages/Admin/User";
import AdminPostList from "./pages/Admin/PostList";

import Qna from "./pages/Qna";
import QnaWrite from "./pages/Qna/QnaWrite";
import QnaDetail from "./pages/Qna/QnaDetail";
import QnaEdit from "./pages/Qna/QnaEdit";

import "./css/index.css";
import "./css/signup.css";
import "./css/login.css";
import "./css/admin.css";

function App() {
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    } else {
      // 임시 기본 유저 (관리자로 로그인된 상태 유지)
      const sampleUser = {
        id: 1,
        username: "testuser",
        email: "testuser@example.com",
        role: "admin",
      };
      setUserInfo(sampleUser);
      localStorage.setItem("userInfo", JSON.stringify(sampleUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(undefined);
  };

  return (
    <BrowserRouter>
      <Header userInfo={userInfo} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path={URL.HOME} element={<Home userInfo={userInfo} />} />

          <Route path={URL.EXERCISE_URL} element={<Exercise />} />
          <Route path={URL.MEAL_URL} element={<Meal />} />
          <Route path={URL.COMMUNITY_URL} element={<Community />} />

          {/* 커뮤니티 */}
          <Route path={URL.COMMUNITY_URL}>
            <Route path="read/:id" element={<CommunityRead />} />
            <Route path="write" element={<CommunityWrite />} />
            <Route path="write/:id" element={<CommunityWrite />} />
          </Route>

          {/* 프로필 */}
          <Route
            path={URL.PROFILE_URL}
            element={<Profile userInfo={userInfo} />}
          />

          {/* 인증 */}
          <Route
            path={URL.LOGIN_URL}
            element={<Login setUserInfo={setUserInfo} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ROM */}
          <Route path={URL.ROM_URL} element={<ROM />} />

          {/* 출석 체크 모달 페이지 */}
          {/* <Route
            path="/attendance-check"
            element={<AttendanceCheckPage userInfo={userInfo} />}
          /> */}

          {/* 관리자 */}
          <Route path="/admin">
            <Route index element={<Admin userInfo={userInfo} />} />
            <Route path="ex" element={<AdminExercise />} />
            <Route path="meal" element={<AdminMeal />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="post" element={<AdminPostList />} />
          </Route>

          {/* QNA */}
          <Route path={URL.QNA_URL}>
            <Route index element={<Qna />} />
            <Route path="write" element={<QnaWrite />} />
            <Route path=":id" element={<QnaDetail />} />
            <Route path="edit/:id" element={<QnaEdit />} />
          </Route>

          <Route path="/*" element={<Navigate to={URL.HOME} replace />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
