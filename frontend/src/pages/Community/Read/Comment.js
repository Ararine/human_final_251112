import { useNavigate } from "react-router-dom";

const Comment = ({
  comments = [],
  newComment,
  setNewComment,
  handleCreateComment,
  editingCommentId,
  setEditingCommentId,
  editingContent,
  setEditingContent,
  handleUpdate,
  handleEdit,
  handleDelete,
  userInfo,
}) => {
  const navigate = useNavigate();
  console.log(comments.comment_user_id, userInfo?.user_id);
  return (
    <>
      {/* 댓글 작성 */}
      <div className="flex-column gap-5">
        <h3>댓글 작성</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
        />
        <button className="btn-ghost bg-green" onClick={handleCreateComment}>
          댓글 작성
        </button>
      </div>
      {/* 댓글 목록 */}
      <div className="flex-column">
        <div style={{ marginTop: "24px" }}>
          <h3>댓글 ({comments.length})</h3>
          {comments.length === 0 ? (
            <p>등록된 댓글이 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className={
                    editingCommentId === comment.id
                      ? "flex-column gap-5"
                      : "flex-between gap-5"
                  }
                  style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}
                >
                  <div className="comment">
                    <p>
                      <strong>작성자:</strong> {comment.email}
                      <br />
                      <strong>내용:</strong> {comment.comment}
                    </p>
                  </div>
                  {editingCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={3}
                      />
                      <div className="flex-end gap-5">
                        <button
                          className="bg-orange btn-ghost"
                          onClick={handleUpdate}
                        >
                          수정 완료
                        </button>
                        <button
                          className="bg-red btn-ghost"
                          onClick={() => setEditingCommentId(null)}
                        >
                          수정취소
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {(comment.comment_user_id === userInfo?.user_id ||
                        userInfo?.type === "admin") && (
                        <div className="flex-row">
                          <button
                            className="black"
                            onClick={() => handleEdit(comment)}
                          >
                            수정
                          </button>
                          <button
                            className="red"
                            onClick={() => handleDelete(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="bg-green btn-ghost"
          onClick={() => navigate("/community")}
        >
          목록으로
        </button>
      </div>
    </>
  );
};
export default Comment;
