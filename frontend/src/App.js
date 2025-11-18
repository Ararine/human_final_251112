import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import URL from "./constants/url";

import "./css/index.css";
import "./css/App.css";
import Exercise from "./pages/Exercise";
import Community from "./pages/Community";
import CommunityWrite from "./pages/CommunityWrite";
import Profile from "./pages/Profile";

import Login from "./modals/Login";

function App() {
  const [userInfo, setUserInfo] = useState(undefined); // undefined → 로딩 상태
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
      };
      setUserInfo(sampleUser);
      localStorage.setItem("userInfo", JSON.stringify(sampleUser));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={URL.HOME} element={<Home />} />
          <Route path={URL.EXERCISE_URL} element={<Exercise />} />
          <Route path={URL.COMMUNITY_URL} element={<Community />} />

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
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Login Route */}
          <Route
            path={URL.LOGIN_URL}
            element={<Login setUserInfo={setUserInfo} />}
          />

          {/* Fallback */}
          <Route path={URL.OTHERS} element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
