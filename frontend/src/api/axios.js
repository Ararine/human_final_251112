/*
import axios from "axios";
import URL from "../constants/url";

export const api = axios.create({
  baseURL: URL.PY_SERVER_URL || "http://localhost:3001",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithCookie = axios.create({
  baseURL: URL.PY_SERVER_URL || "http://localhost:3001",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiUpload = axios.create({
  baseURL: URL.PY_SERVER_URL || "http://localhost:3001",
  timeout: 10000,
  withCredentials: true,
});
*/

// ==========================================
// 🔥 수정된 실제 동작 코드
// ==========================================
import axios from "axios";
import URL from "../constants/url";

// 🔸 일반 API 요청 (로그인, 회원가입, 커뮤니티 등)
export const api = axios.create({
  baseURL: URL.SERVER_URL, // 🔥 FastAPI 서버 주소 (http://localhost:5001)
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔸 쿠키 기반 API 요청 (현재는 사용 안 해도 됨)
export const apiWithCookie = axios.create({
  baseURL: URL.SERVER_URL, // 🔥 동일하게 FastAPI 백엔드로 설정
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔸 파일 업로드 용 (ROM / AI 분석 등)
export const apiUpload = axios.create({
  baseURL: URL.SERVER_URL, // 🔥 업로드도 FastAPI 서버로 이동
  timeout: 10000,
  withCredentials: true,
});
