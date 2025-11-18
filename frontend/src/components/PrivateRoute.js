import { Navigate, useLocation } from "react-router-dom";
import URL from "../constants/url";

export default function PrivateRoute({ userInfo, children }) {
  const location = useLocation();

  // 아직 유저 정보 로딩 중
  if (userInfo === undefined) {
    return <div>Loading...</div>;
  }

  // 로그인 안 된 상태면 로그인 페이지로 이동
  if (!userInfo) {
    return (
      <Navigate
        to={URL.LOGIN_URL}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // 로그인 됐으면 접근 허용
  return children;
}
