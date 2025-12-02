import axios from "axios";
import URL from "../constants/url";

export const api = axios.create({
  baseURL: URL.PY_SERVER_URL || "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithCookie = axios.create({
  baseURL: URL.PY_SERVER_URL || "http://localhost:3001",
  timeout: 5000,
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
