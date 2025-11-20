import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import URL from "./constants/url";

import "./css/index.css";
import "./css/global.css";
import "./css/signup.css";
import "./css/login.css";
import "./css/admin.css";
import Exercise from "./pages/Exercise";
import Community from "./pages/Community";
import CommunityWrite from "./pages/Community/Write";
import CommunityRead from "./pages/Community/Read";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

import Admin from "./pages/Admin";
import { default as AdminExercise } from "./pages/Admin/Exercise";
import { default as AdminMeal } from "./pages/Admin/Meal";
import { default as AdminUser } from "./pages/Admin/User";
import { default as AdminPostList } from "./pages/Admin/PostList";

function App() {
  // ✅ 로그인 정보 상태
  const [userInfo, setUserInfo] = useState(undefined);

  // 새로고침해도 로그인 유지
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    } else {
      /* 로그인 구현 시 */
      // setUserInfo(null);

      /* 로그인 미구현 시 샘플 */
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

            <Route
              path="/admin"
              element={
                <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                  <Admin userInfo={userInfo} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/ex"
              element={
                <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                  <AdminExercise />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/meal"
              element={
                <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                  <AdminMeal />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/user"
              element={
                <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                  <AdminUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/post"
              element={
                <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                  <AdminPostList />
                </PrivateRoute>
              }
            />
            {/* Fallback */}
            <Route
              path={URL.OTHERS}
              element={<Navigate to={URL.HOME} replace />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
