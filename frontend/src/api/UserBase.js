import { api } from "./axios";

export async function getUserByUserId(user_id) {
  try {
    const response = await api.get(`/base/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("유저 기본 정보 불러오기 실패:", error);
    throw error;
  }
}

export async function updateUserByUserId(
  user_id,
  gender,
  age,
  height,
  weight_data
) {
  try {
    const response = await api.put(`/base/${user_id}`, {
      gender,
      age,
      height,
      weight: weight_data,
    });
    return response.data;
  } catch (error) {
    console.error("유저 기본 정보 수정 실패:", error);
    throw error;
  }
}
