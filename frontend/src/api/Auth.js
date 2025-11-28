// =============================
// 🔥 기존 코드 (보존용)
// =============================
/*
import { api } from "./axios";

export async function loginRequest(email, password) {
  try {
    const response = await api.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
}

export async function requestPasswordReset(email) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("비밀번호 재설정 요청 실패:", error);
    throw error;
  }
}
*/

// =============================
// 🔥 수정된 실제 동작 코드
// =============================
import { api } from "./axios";

// 🔹 로그인 (POST /user/login)
export async function loginRequest(email, password) {
  try {
    const response = await api.post("/user/login", { email, password });
    return response.data; // { message, token }
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
}

// 🔹 회원가입 (POST /user/create)
export async function signupRequest(form) {
  console.log(form);
  try {
    const response = await api.post("/user", form);
    return response.data; // { message, results }
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
}

// 🔹 로그인된 사용자 정보 조회 (GET /user)
//   → App.js에서 자동 로그인 유지에 사용
export async function getUserInfoRequest() {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data; // 유저 정보만 반환
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw error;
  }
}

// 🔹 비밀번호 재설정 요청 (미사용 상태지만 정상 구현)
export async function requestPasswordReset(email) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("비밀번호 재설정 요청 실패:", error);
    throw error;
  }
}
