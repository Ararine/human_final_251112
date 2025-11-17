import { api } from "./api";

export async function createPost({ title, content, authorId }) {
  try {
    const res = await api.post("/posts", {
      title,
      content,
      author_id: authorId,
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

export async function updatePost(postId, { title, content }) {
  try {
    const res = await api.put(`/posts/${postId}`, {
      title,
      content,
      author_id: authorId,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    throw err;
  }
}
export async function deletePost(postId) {
  try {
    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패:", err);
    throw err;
  }
}
