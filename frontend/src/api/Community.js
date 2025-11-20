import { api, apiWithCookie } from "./axios";

// 게시글 생성
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

// 게시글 목록 조회
export async function getPosts() {
  try {
    const res = await api.get("/posts");
    return res.data;
  } catch (err) {
    console.error("게시글 목록 불러오기 실패:", err);
    throw err;
  }
}

export async function getPostsByUserId(user_id) {
  try {
    const res = await api.get(`/posts/user/${user_id}`);
    return res.data;
  } catch (err) {
    console.error("특정 유저 게시글 목록 불러오기 실패:", err);
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

// 게시글 수정
export async function updatePost(postId, { title, contents }) {
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

// 게시글 삭제
export async function deletePost(postId) {
  try {
    const res = await apiWithCookie.delete(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패:", err);
    throw err;
  }
}

// 게시글 신고
export async function createPostReport(post_id, comment_user_id, comment) {
  try {
    const res = await apiWithCookie.post(`/posts/report/${post_id}`, {
      comment_user_id,
      comment,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 신고 실패:", err);
    throw err;
  }
}

// 신고 게시글 목록 조회
export async function getPostReport() {
  try {
    const res = await apiWithCookie.get("/posts/report");
    return res.data;
  } catch (err) {
    console.error("게시글 목록 불러오기 실패:", err);
    throw err;
  }
}
