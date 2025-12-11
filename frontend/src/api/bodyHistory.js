import { api } from "./axios"; // axios 인스턴스 import

// =====================================
// 1. 전체 변화 이력 조회 (그래프용)
// GET /bodyhistory/:user_id
// =====================================
export async function getBodyHistory(user_id) {
  try {
    const res = await api.get(`/bodyhistory/${user_id}`);
    return res.data; // { message, data: [...] }
  } catch (err) {
    console.error("변화 이력 불러오기 실패:", err);
    throw err;
  }
}

// =====================================
// 2. 변화 이력 생성
// POST /bodyhistory/
// body: { user_id, weight, height, bmi, bmr }
// =====================================
export async function createBodyHistory(bodyData) {
  try {
    const res = await api.post(`/bodyhistory`, bodyData);
    return res.data; // { message, record_id }
  } catch (err) {
    console.error("변화 이력 생성 실패:", err);
    throw err;
  }
}

// =====================================
// 3. 변화 이력 수정
// PUT /bodyhistory/:record_id
// body: { weight?, height?, bmi?, bmr? } — optional 가능
// =====================================
export async function updateBodyHistory(record_id, updateData) {
  try {
    const res = await api.put(`/bodyhistory/${record_id}`, updateData);
    return res.data; // { message }
  } catch (err) {
    console.error("변화 이력 수정 실패:", err);
    throw err;
  }
}

// =====================================
// 4. 변화 이력 삭제
// DELETE /bodyhistory/:record_id
// =====================================
export async function deleteBodyHistory(record_id) {
  try {
    const res = await api.delete(`/bodyhistory/${record_id}`);
    return res.data; // { message }
  } catch (err) {
    console.error("변화 기록 삭제 실패:", err);
    throw err;
  }
}
