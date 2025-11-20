import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import URL from "../../constants/url";
import LoginForm from "./LoginForm";
// import { loginRequest } from "../api/Auth"; 백엔드 연결할 때 주석 풀 예정

const Login = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 폼 상태 (이메일 / 비밀번호)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // input 값이 바뀔 때마다 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인 버튼 클릭 시
  const handleLogin = async (e) => {
    e.preventDefault();

    // ==============================
    // ① 현재 버전: 백엔드 없이 "가짜 로그인"
    // ==============================
    const fakeUser = {
      id: 1,
      email: form.email,
      username: "테스트유저",
      // 나중에 필요하면 더 넣어도 됨
    };

    // 로컬스토리지에 로그인 정보 저장
    localStorage.setItem("userInfo", JSON.stringify(fakeUser));
    // App.js의 userInfo 상태 업데이트
    setUserInfo(fakeUser);

    // 원래 가려던 페이지가 있으면 거기로, 없으면 홈으로
    const redirectPath = location.state?.from || URL.HOME;
    navigate(redirectPath, { replace: true });

    // ② 백엔드 로그인 API 연결 후에는 아래처럼 변경
    /*
        try {
            // 서버에 로그인 요청 (이메일, 비밀번호 전달)
            const user = await loginRequest(form.email, form.password);

            // 서버에서 받은 유저 정보를 저장
            localStorage.setItem("userInfo", JSON.stringify(user));
            setUserInfo(user);

            const redirectPath = location.state?.from || URL.HOME;
            navigate(redirectPath, { replace: true });
        } catch (error) {
            console.error("로그인 실패:", error);
            alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        }
        */
  };

  return (
    <div className="login-page">
      <h2 className="login-title">로그인</h2>

      <LoginForm
        form={form}
        handleChange={handleChange}
        handleLogin={handleLogin}
      />

      <div className="login-links">
        <p>
          아직 회원이 아니신가요?{" "}
          <Link to="/signup" className="link-strong">
            회원가입
          </Link>
        </p>
        <p>
          비밀번호를 잊으셨나요?{" "}
          <Link to="/forgot-password" className="link-normal">
            비밀번호 재설정
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
