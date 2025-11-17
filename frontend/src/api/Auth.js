import { api } from "./axios";

export async function loginRequest(email, password) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
}
