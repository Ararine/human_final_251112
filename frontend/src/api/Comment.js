import { api } from "./axios";

export async function createComment(postId, contents) {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/comments",
      {
        post_id: postId,
        contents,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("댓글 작성 실패:", err);
    throw err;
  }
}

export async function getCommentsByPostId(postId) {
  try {
    const res = await api.get(`/comments/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 상세 불러오기 실패:", err);
    throw err;
  }
}

export async function updateComment(postId, contents) {
  try {
    const res = await api.put(`/comments/${postId}`, {
      contents,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    throw err;
  }
}
export async function deleteComment(postId) {
  console.log(postId);
  try {
    const res = await api.delete(`/comments/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패:", err);
    throw err;
  }
}
