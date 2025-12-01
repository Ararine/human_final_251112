import { api } from "./axios";

export async function recommendedCurriculum(user_id, n_days, available_time) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/ai/curriculum",
      {
        n_days,
        available_time,
      },
      {
        headers: {
          timeout: 120000,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("기본 커리큘럼 생성 실패:", err);
    throw err;
  }
}

export async function createExercise(exId, name, type, link) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/exercise",
      {
        ex_id: exId,
        name,
        type,
        link,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("기본 운동 작성 실패:", err);
    throw err;
  }
}

export async function getExercises() {
  try {
    const res = await api.get(`/exercise`);
    return res.data;
  } catch (err) {
    console.error("기본 운동 불러오기 실패:", err);
    throw err;
  }
}

export async function getExerciseByPostId(exId) {
  try {
    const res = await api.get(`/exercise/${exId}`);
    return res.data;
  } catch (err) {
    console.error("기본 운동 불러오기 실패:", err);
    throw err;
  }
}

export async function updateExercise(exId, name, type, link) {
  try {
    const res = await api.put(`/exercise/${exId}`, {
      name,
      type,
      link,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    throw err;
  }
}
export async function deleteExercise(exId) {
  try {
    const res = await api.delete(`/exercise/${exId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패:", err);
    throw err;
  }
}
