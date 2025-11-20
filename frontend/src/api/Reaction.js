import { api, apiWithCookie } from "./axios";

// 미사용
export async function createPostReaction(post_id, user_id, reaction_type) {
  try {
    const res = await apiWithCookie.post("/reactions", {
      post_id,
      user_id,
      reaction_type,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 반응 실패:", err);
    throw err;
  }
}

export async function getPostReactionById(postId) {
  try {
    const res = await api.get(`/reactions/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 반응 목록 조회 실패:", err);
    throw err;
  }
}

export async function updatePostReactionById(
  postId,
  { user_id, reaction_type }
) {
  try {
    const res = await apiWithCookie.put(`/reactions/${postId}`, {
      user_id,
      reaction_type,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 반응 수정 실패:", err);
    throw err;
  }
}
// 미사용
export async function deletePostReactionById(post_id, user_id) {
  try {
    const res = await apiWithCookie.delete(`/reactions/${post_id}`, {
      user_id,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 반응 삭제 실패:", err);
    throw err;
  }
}
