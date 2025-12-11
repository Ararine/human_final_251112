import { api } from "./axios";

export async function signupRequest(form) {
  console.log(form);
  try {
    const response = await api.post("/user", form);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
}

export async function loginRequest(email, password) {
  try {
    const response = await api.post("/user/login", {
      email,
      password,
    });
    //추가 (박한비)- 로컬저장
    const { token, user } = response.data;

    // 🔥 여기서 토큰/유저정보 저장
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(user));

    // 여기까지 (박한비)- 로컬저장

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
