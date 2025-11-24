const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/node" : "http://localhost:5000";
const PY_SERVER_URL =
  process.env.NODE_ENV === "production" ? "/py" : "http://localhost:5001";

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
  OTHERS: "*",
  TEST_PATH: "/test",
  ROM_URL: "/rom",
};
export default URL;
