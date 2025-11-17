import { api } from "./axios";

export async function fetchUserInfo(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("유저 정보 불러오기 실패:", error);
    throw error;
  }
}
