import axios from "axios";

/* -----------------------------
    🔹 1) 기본정보 (user_base_info)
    ✔ FastAPI 실제 경로 = /base/{user_id}
----------------------------- */

const BASE_URL_BASE = "http://localhost:5001/base";
const BASE_URL_DETAIL = "http://localhost:5001/users";

// 조회
export const getUserBase = async (userId) => {
  const res = await axios.get(`${BASE_URL_BASE}/${userId}`);
  return res.data;
};

// 생성
export const createUserBase = async (userId, data) => {
  const res = await axios.post(`${BASE_URL_BASE}/${userId}`, data);
  return res.data;
};

// 수정
export const updateUserBase = async (userId, data) => {
  const res = await axios.put(`${BASE_URL_BASE}/${userId}`, data);
  return res.data;
};

/* -----------------------------
    🔹 2) 상세정보 (user_detail_info)
    ✔ FastAPI 경로 = /users/{user_id}/detail
----------------------------- */

// 조회
export const getUserDetail = async (userId) => {
  const res = await axios.get(`${BASE_URL_DETAIL}/${userId}/detail`);
  return res.data;
};

// 생성
export const createUserDetail = async (userId, data) => {
  const res = await axios.post(`${BASE_URL_DETAIL}/${userId}/detail`, data);
  return res.data;
};

// 수정
export const updateUserDetail = async (userId, data) => {
  const res = await axios.put(`${BASE_URL_DETAIL}/${userId}/detail`, data);
  return res.data;
};
