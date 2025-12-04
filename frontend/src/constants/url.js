// ========================
// 🔥 기존 코드 (보존용 주석)
// ========================
/*
const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/node" : "http://localhost:5000";
const PY_SERVER_URL =
  process.env.NODE_ENV === "production" ? "/py" : "http://localhost:5001";
*/

// ========================
// 🔥 수정된 실제 동작 코드
// — FastAPI BACKEND_PORT = 5001
// ========================
const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/node" : "http://localhost:5001"; // ← FastAPI(백엔드) 실제 포트

const PY_SERVER_URL =
  process.env.NODE_ENV === "production" ? "/py" : "http://localhost:5001"; // 필요한 경우 AI서버 포트로 변경 가능

// ========================
// URL 객체 그대로 유지
// ========================
const URL = {
  HOME: "/",
  SERVER_URL,
  PY_SERVER_URL,
  EXERCISE_URL: "/exercise",
  MEAL_URL: "/meal",
  COMMUNITY_URL: "/community",
  LOGIN_URL: "/login",
  PROFILE_URL: "/profile",
  QNA_URL: "/qna",
  SIGNUP_URL: "/signup",
  OTHERS: "*",
  TEST_PATH: "/test",
  ROM_URL: "/rom",
  SUBSCRIBE_URL: "/subscribe",
};

export default URL;
