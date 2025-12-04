import { Link, useNavigate } from "react-router-dom";
import URL from "../../constants/url";

const Header = ({ userInfo, onLogout }) => {
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
            <button onClick={goSubscribe}>
              {userInfo.type === "normal" ? "구독" : "구독중"}
            </button>
            <span>{(userInfo.email || userInfo.username) + " 님"}</span>

            <button className="btn-ghost" onClick={goProfile}>
              마이페이지
            </button>

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
