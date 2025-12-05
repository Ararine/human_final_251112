import { api } from "./axios";

export async function createUserDetailInfo(contents) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post("/detail", contents, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("사용자 상세 정보 생성 실패:", err);
    throw err;
  }
}

export async function getUserDetailInfoByUserId() {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("사용자 상세 정보 조회 실패:", err);
    throw err;
  }
}

export async function updateUserDetailInfo(contents) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.put("/detail", contents, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("사용자 상세 정보 수정 실패:", err);
    throw err;
  }
}
