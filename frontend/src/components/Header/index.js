// src/components/Header/index.js
import { Link, useNavigate } from "react-router-dom";
import URL from "../../constants/url";

const Header = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();

  const goHome = () => navigate(URL.HOME);
  const goLogin = () => navigate(URL.LOGIN_URL);
  const goSignup = () => navigate("/signup");
  const goProfile = () => navigate(URL.PROFILE_URL);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout(); // ✅ App.js의 handleLogout 함수 호출
    }
    navigate(URL.HOME);
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="logo" onClick={goHome}>
          HomeFit
        </button>

        <nav className="gnb">
          <Link to={URL.EXERCISE_URL}>운동</Link>
          <Link to={URL.COMMUNITY_URL}>운동커뮤니티</Link>
          <Link to={URL.MEAL_URL}>식단</Link>
        </nav>
      </div>

      <div className="header-right">
        {userInfo ? (
          <>
            <span className="header-user">
              {(userInfo.email || userInfo.username || "사용자") + " 님"}
            </span>
            <button className="btn-ghost" onClick={goProfile}>
              마이페이지
            </button>
            <button className="btn-outline" onClick={handleLogoutClick}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="btn-outline" onClick={goLogin}>
              로그인
            </button>
            <button className="btn-primary small" onClick={goSignup}>
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
