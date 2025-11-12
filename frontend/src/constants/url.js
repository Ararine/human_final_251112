const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/node" : "http://localhost:5000";
const PY_SERVER_URL =
  process.env.NODE_ENV === "production" ? "/py" : "http://localhost:5001";

const URL = {
  HOME: "/",
  SERVER_URL,
  PY_SERVER_URL,
  TEST_PATH: "/test",
};
export default URL;
