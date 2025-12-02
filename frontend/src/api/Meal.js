import { api } from "./axios";

export async function recommendedMealLists(n_days, n_times) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/ai/meal_list",
      {
        n_days,
        n_times,
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
    console.error("기본 식단 목록 작성 실패:", err);
    throw err;
  }
}

export async function getCalories(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/ai/calories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.error("칼로리 추정 실패:", err);
    throw err;
  }
}

// todo 인증 성공 시 보상 주게 수정 필요
export async function uploadMealAuth(file) {
  console.log(file);
  try {
    const originalName = file.name;
    const newFileName = `imgs/${originalName}`; // 서버에서 imgs 폴더에 저장하도록 이름 지정
    const renamedFile = new File([file], newFileName, { type: file.type });

    const formData = new FormData();
    formData.append("file", renamedFile);

    const res = await api.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("식단 인증 업로드 성공:", res);
    return res.data;
  } catch (err) {
    console.error("식단 인증 업로드 실패:", err);
    throw err;
  }
}

export async function createBaseMeal(name, calories, link) {
  try {
    const res = await api.post("/meal", {
      name,
      calories,
      link,
    });

    return res.data;
  } catch (err) {
    console.error("기본 식단 생성 실패:", err);
    throw err;
  }
}

export async function getBaseMeal() {
  try {
    const res = await api.get(`/meal`);
    return res.data;
  } catch (err) {
    console.error("기본 식단 불러오기 실패:", err);
    throw err;
  }
}
export async function getBaseMealByMealId(meal_id) {
  try {
    const res = await api.get(`/meal/${meal_id}`);
    return res.data;
  } catch (err) {
    console.error("기본 식단 상세 불러오기 실패:", err);
    throw err;
  }
}

export async function updateBaseMealByMealId(meal_id, name, calories, link) {
  try {
    const res = await api.put(`/meal/${meal_id}`, {
      name,
      calories,
      link,
    });
    return res.data;
  } catch (err) {
    console.error("기본 식단 수정 실패:", err);
    throw err;
  }
}
export async function deleteBaseMealByMealId(meal_id) {
  try {
    const res = await api.delete(`/meal/${meal_id}`);
    return res.data;
  } catch (err) {
    console.error("기본 식단 삭제 실패:", err);
    throw err;
  }
}
