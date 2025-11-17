import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const user = { name: "홍길동", id: 1 };
    localStorage.setItem("userInfo", JSON.stringify(user));
    setUserInfo(user);

    // 원래 요청한 경로 or 기본 경로(HOME)
    const redirectPath = location.state?.from || "/";
    navigate(redirectPath, { replace: true });
  };

  return <></>;
};

export default Login;
