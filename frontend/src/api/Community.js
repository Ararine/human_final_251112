import { api, apiWithCookie } from "./axios";

export async function createPost(title, contents, authorId) {
  try {
    const res = await apiWithCookie.post("/posts", {
      title,
      contents,
      user_id: authorId,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 작성 실패:", err);
    throw err;
  }
}

export async function getPosts() {
  try {
    const res = await api.get("/posts");
    return res.data;
  } catch (err) {
    console.error("게시글 목록 불러오기 실패:", err);
    throw err;
  }
}

export async function getPostDetail(postId) {
  try {
    const res = await api.get(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 상세 불러오기 실패:", err);
    throw err;
  }
}

export async function updatePost(postId, { title, contents }) {
  console.log(contents);
  try {
    const res = await apiWithCookie.put(`/posts/${postId}`, {
      title,
      contents,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    throw err;
  }
}
export async function deletePost(postId) {
  try {
    const res = await apiWithCookie.delete(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패:", err);
    throw err;
  }
}
