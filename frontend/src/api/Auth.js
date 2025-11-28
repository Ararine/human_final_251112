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
// 🔹 비밀번호 재설정 메일 요청 (나중에 실제로 쓸 함수)
export async function requestPasswordReset(email) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("비밀번호 재설정 요청 실패:", error);
    throw error;
  }
}
// ForgotPassword.js에서 나중에 이렇게 바꾸면 됨:

// // 지금은 console.log + alert 쓰는 부분을
// import { requestPasswordReset } from "../api/Auth";

// // ...
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await requestPasswordReset(email);
//         setSent(true);
//         alert("비밀번호 재설정 메일을 보냈습니다.");
//     } catch (err) {
//         alert("요청에 실패했습니다. 다시 시도해주세요.");
//     }
// };
