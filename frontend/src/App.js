import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URL from "./constants/url";

import "./css/index.css";
import "./css/App.css";
import Exercise from "./pages/Exercise";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Login from "./modals/Login";

function App() {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={URL.HOME} element={<Home />} />
          <Route path={URL.EXERCISE_URL} element={<Exercise />} />
          <Route path={URL.COMMUNITY_URL} element={<Community />} />
          <Route
            path={URL.PROFILE_URL}
            element={
              <PrivateRoute userInfo={userInfo}>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path={URL.LOGIN_URL}
            element={<Login setUserInfo={setUserInfo} />}
          />
          <Route path={URL.OTHERS} element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
