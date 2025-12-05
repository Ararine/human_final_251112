import { api } from "./axios"; // axios 인스턴스 import

// 최신 BMI/BMR 조회
export async function getLatestBodyIndex(user_id) {
  try {
    const res = await api.get(`/bmi/${user_id}`);
    console.log(res);
    return res.data; // res.data.data 형태 반환 예상
  } catch (err) {
    console.error("BMI/BMR 불러오기 실패:", err);
    throw err;
  }
}

// 특정 날짜 BMI/BMR 조회 (옵션)
export async function getBodyIndexByDate(date) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`/body/${date}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return res.data;
  } catch (err) {
    console.error("해당 날짜 BMI/BMR 불러오기 실패:", err);
    throw err;
  }
}
