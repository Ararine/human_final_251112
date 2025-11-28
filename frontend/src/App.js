// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

import URL from "./constants/url";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(undefined);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    setUserInfo(decoded);

    const expiryTime = decoded.exp * 1000;
    const timeLeft = expiryTime - Date.now();
    console.log("남은 시간 (ms):", timeLeft / 1000);
    if (timeLeft <= 0) {
      // 이미 만료됨
      handleLogout();
    } else {
      // 만료까지 타이머 설정
      const timer = setTimeout(() => {
        handleLogout();
      }, timeLeft);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header userInfo={userInfo} onLogout={handleLogout} />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <main>
          <Routes>
            {/* 기본 페이지 */}
            <Route path={URL.HOME} element={<Home userInfo={userInfo} />} />
            <Route path={URL.EXERCISE_URL} element={<Exercise />} />
            <Route path={URL.MEAL_URL} element={<Meal />} />
            <Route path={URL.COMMUNITY_URL} element={<Community />} />

            {/* 커뮤니티 */}
            <Route path={URL.COMMUNITY_URL}>
              <Route path="read/:id" element={<CommunityRead />} />
              <Route element={<PrivateRoute userInfo={userInfo} />}>
                <Route path="write" element={<CommunityWrite />} />
                <Route path="write/:id" element={<CommunityWrite />} />
              </Route>
            </Route>

            {/* 프로필 */}
            <Route element={<PrivateRoute userInfo={userInfo} />}>
              <Route
                path={URL.PROFILE_URL}
                element={<Profile userInfo={userInfo} />}
              />
            </Route>

            {/* Auth */}
            <Route
              path={URL.LOGIN_URL}
              element={<Login setUserInfo={setUserInfo} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ROM */}
            <Route path={URL.ROM_URL} element={<ROM />} />

            {/* 관리자 */}
            <Route
              path="/admin"
              element={<PrivateRoute userInfo={userInfo} requireAdmin={true} />}
            >
              <Route index element={<Admin userInfo={userInfo} />} />
              <Route path="ex" element={<AdminExercise />} />
              <Route path="meal" element={<AdminMeal />} />
              <Route path="user" element={<AdminUser />} />
              <Route path="post" element={<AdminPostList />} />
            </Route>

            {/* 🔥 QNA ROUTES */}
            <Route path={URL.QNA_URL}>
              <Route index element={<Qna />} />
              <Route path=":id" element={<QnaDetail />} />
              <Route path="edit/:id" element={<QnaEdit />} />
              <Route element={<PrivateRoute userInfo={userInfo} />}>
                <Route path="write" element={<QnaWrite />} />
              </Route>
            </Route>

            {/* 기타 */}
            <Route path="/*" element={<Navigate to={URL.HOME} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
