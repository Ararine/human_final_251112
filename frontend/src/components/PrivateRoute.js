import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ userInfo, children }) {
  const location = useLocation();
  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
