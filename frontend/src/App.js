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
import AdminExercise from "./pages/Admin/Exercise";
import AdminMeal from "./pages/Admin/Meal";
import AdminUser from "./pages/Admin/User";
import AdminPostList from "./pages/Admin/PostList";

import Qna from "./pages/Qna";
import QnaWrite from "./pages/Qna/QnaWrite";
import QnaDetail from "./pages/Qna/QnaDetail";

function App() {
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    } else {
      // 테스트용
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
          {/* 기본 페이지 */}
          <Route path={URL.HOME} element={<Home />} />
          <Route path={URL.EXERCISE_URL} element={<Exercise />} />
          <Route path={URL.COMMUNITY_URL} element={<Community />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 커뮤니티 */}
          <Route path={URL.COMMUNITY_URL}>
            <Route path="read/:id" element={<CommunityRead />} />
            <Route element={<PrivateRoute userInfo={userInfo} />}>
              <Route path="write" element={<CommunityWrite />} />
              <Route path="write/:id" element={<CommunityWrite />} />
            </Route>
          </Route>

          {/* 프로필 */}
          <Route
            path={URL.PROFILE_URL}
            element={
              <PrivateRoute userInfo={userInfo}>
                <Profile userInfo={userInfo} />
              </PrivateRoute>
            }
          />

          {/* Auth */}
          <Route
            path={URL.LOGIN_URL}
            element={<Login setUserInfo={setUserInfo} />}
          />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path={URL.ROM_URL}
            element={
              <PrivateRoute userInfo={userInfo}>
                <Profile userInfo={userInfo} />
              </PrivateRoute>
            }
          />
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

            <Route element={<PrivateRoute userInfo={userInfo} />}>
              <Route path="write" element={<QnaWrite />} />
            </Route>
          </Route>

          {/* 기타 */}
          <Route path="/*" element={<Navigate to={URL.HOME} replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
