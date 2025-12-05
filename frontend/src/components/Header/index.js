import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import URL from "../../constants/url";
const Header = ({ userInfo, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const goHome = () => navigate(URL.HOME);
  const goLogin = () => navigate(URL.LOGIN_URL);
  const goSignup = () => navigate("/signup");
  const goProfile = () => navigate(URL.PROFILE_URL);

  const goSubscribe = () => navigate(URL.SUBSCRIBE_URL);

  const handleLogoutClick = () => {
    onLogout?.();
    navigate(URL.HOME);
  };

  return (
    <header>
      <div>
        <button className="logo" onClick={goHome}>
          HomeFit
        </button>
        <nav>
          <Link to={URL.EXERCISE_URL}>운동</Link>
          <Link to={URL.MEAL_URL}>식단</Link>
          <Link to="/rom">ROM</Link>
          <Link to={URL.COMMUNITY_URL}>커뮤니티</Link>
          <Link to="/qna">Q&A</Link>
        </nav>
      </div>

      <div>
        {userInfo ? (
          <>
            <button className="bg-darkgray btn-ghost" onClick={goSubscribe}>
              {userInfo.type === "normal" ? "구독" : "구독중"}
            </button>
            <span>{(userInfo.email || userInfo.username) + " 님"}</span>

            <div
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="btn-ghost zero-padding">마이페이지</button>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    padding: "8px",
                    display: "flex",
                    gap: "4px",
                    flexDirection: "column",
                    fontSize: "13px",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "10px",
                  }}
                >
                  <div onClick={() => navigate("/profile")}>활동정보</div>
                  <div onClick={() => navigate("/profile/personal")}>
                    개인정보
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleLogoutClick}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={goLogin}>로그인</button>
            <button onClick={goSignup}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
