import axios from "axios";
import URL from "../constants/url";

export const api = axios.create({
  baseURL: URL.SERVER_URL || "http://localhost:3001", // 백엔드 주소
  timeout: 5000, // 요청 제한 시간 5초
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiWithCookie = axios.create({
  baseURL: URL.SERVER_URL || "http://localhost:3001", // 백엔드 주소
  timeout: 5000, // 요청 제한 시간 5초
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiUpload = axios.create({
  baseURL: URL.SERVER_URL || "http://localhost:3001",
  timeout: 10000,
  withCredentials: true,
});
