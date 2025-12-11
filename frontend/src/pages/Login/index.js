import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import URL from "../../constants/url";
import LoginForm from "./LoginForm";

// 백엔드 연결
import { loginRequest } from "../../api/Auth";

const Login = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 이메일/비밀번호 상태
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1) 서버에 로그인 요청
      const response = await loginRequest(form.email, form.password);

      console.log("로그인 응답:", response);

      // 2) token 존재 시 저장
      if (response?.token) {
        const token = response.token;
        localStorage.setItem("token", token);

        // 3) 토큰 decode → 유저 상태에 저장
        const decoded = jwtDecode(token);
        console.log("디코드 정보:", decoded);
        setUserInfo(decoded);

        // 4) 원래 가던 페이지 or 홈으로 이동
        const redirectPath = location.state?.from || URL.HOME;
        navigate(redirectPath, { replace: true });
        return;
      }

      alert("서버에서 올바른 응답을 받지 못했습니다.");
    } catch (error) {
      console.error("로그인 실패:", error);

      const status = error?.response?.status;

      if (status === 403) {
        alert("계정이 비활성화되었습니다.");
      } else if (status === 401) {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="login-container flex-center black">
      <div className="card flex-column flex-center bg-white">
        <h2 className="login-title black">로그인</h2>

        <LoginForm
          form={form}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />

        <div className="login-links">
          <p>
            아직 회원이 아니신가요?
            <Link to="/signup" className="link-strong">
              회원가입
            </Link>
          </p>
          <p>
            비밀번호를 잊으셨나요?
            <Link to="/forgot-password" className="link-normal">
              비밀번호 재설정
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
