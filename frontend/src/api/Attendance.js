import { apiWithCookie } from "./axios";

export async function Attendance(user_id) {
  try {
    const res = await apiWithCookie.post(`/attendance/${user_id}`);
    return res.data;
  } catch (err) {
    console.error("출석 실패:", err);
    throw err;
  }
}
