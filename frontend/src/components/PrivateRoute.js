import { Navigate, useLocation, Outlet } from "react-router-dom";
import URL from "../constants/url";

export default function PrivateRoute({ userInfo, requireAdmin = false }) {
  const location = useLocation();
  console.log(userInfo);
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
  // 관리자 권한이 필요한 페이지인데, 일반 유저라면 접근 제한
  // backend 에서 처리하게 수정 필요
  if (requireAdmin && userInfo.type !== "admin") {
    alert("접근 권한이 없습니다.");
    return (
      <Navigate to={URL.HOME} replace state={{ from: location.pathname }} />
    );
  }
  // 로그인 됐으면 접근 허용
  return <Outlet />;
}
