import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import URL from "./constants/url";

import "./css/index.css";
import "./css/global.css";
import "./css/signup.css";
import "./css/login.css";
import Exercise from "./pages/Exercise";
import Community from "./pages/Community";
import CommunityWrite from "./pages/Community/Write";
import CommunityRead from "./pages/Community/Read";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  // ✅ 로그인 정보 상태
  const [userInfo, setUserInfo] = useState(undefined);

  // 새로고침해도 로그인 유지
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  // ✅ 로그아웃 함수 (파라미터 절대 받지 말 것!)
  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // 저장된 로그인 정보 삭제
    setUserInfo(undefined); // 상태 초기화
  };

  return (
    <>
      <BrowserRouter>
        <Header userInfo={userInfo} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path={URL.HOME} element={<Home />} />
            <Route path={URL.EXERCISE_URL} element={<Exercise />} />
            <Route path={URL.COMMUNITY_URL} element={<Community />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/signup" element={<SignUp />} />
            <Route
              path={`${URL.COMMUNITY_URL}/read/:id`}
              element={<CommunityRead />}
            />

            {/* Private Routes */}
            <Route
              path={`${URL.COMMUNITY_URL}/write`}
              element={
                <PrivateRoute userInfo={userInfo}>
                  <CommunityWrite />
                </PrivateRoute>
              }
            />
            <Route
              path={`${URL.COMMUNITY_URL}/write/:id`}
              element={
                <PrivateRoute userInfo={userInfo}>
                  <CommunityWrite />
                </PrivateRoute>
              }
            />
            <Route
              path={URL.PROFILE_URL}
              element={
                <PrivateRoute userInfo={userInfo}>
                  {/* ✅ 여기서 Profile 컴포넌트에 userInfo를 넘겨줌 */}
                  <Profile userInfo={userInfo} />
                </PrivateRoute>
              }
            />

            {/* Login Route */}
            {/* 로그인 페이지 – 로그인 성공 시 setUserInfo 사용 */}

            <Route
              path={URL.LOGIN_URL}
              element={<Login setUserInfo={setUserInfo} />}
            />

            {/* Fallback */}
            <Route path={URL.OTHERS} element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
