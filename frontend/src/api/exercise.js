import { api } from "./axios";

export async function recommendedCurriculum(n_days, available_time) {
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
          Authorization: `Bearer ${token}`,
        },
        timeout: 120000,
      }
    );
    return res.data;
  } catch (err) {
    console.error("기본 커리큘럼 생성 실패:", err);
    throw err;
  }
}
export async function getRecommendedCurriculum() {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/ai/curriculum", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 120000,
    });
    return res.data;
  } catch (err) {
    console.error("기본 커리큘럼 조회 실패:", err);
    throw err;
  }
}
export async function deleteRecommendedCurriculum() {
  try {
    const token = localStorage.getItem("token");
    const res = await api.delete("/ai/curriculum", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 120000,
    });
    return res.data;
  } catch (err) {
    console.error("기본 커리큘럼 삭제 실패:", err);
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
