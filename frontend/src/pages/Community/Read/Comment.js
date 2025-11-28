import { useNavigate } from "react-router-dom";

const Comment = ({
  comments = [],
  newComment,
  setNewComment,
  handleCreateComment,
  editingCommentId,
  editingContent,
  setEditingContent,
  handleUpdate,
  handleEdit,
  handleDelete,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {/* 댓글 작성 */}
      <div style={{ marginTop: "24px" }}>
        <h3>댓글 작성</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button
          onClick={handleCreateComment}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          댓글 작성
        </button>
      </div>
      {/* 댓글 목록 */}

      <div style={{ marginTop: "24px" }}>
        <h3>댓글 ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>등록된 댓글이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {comments.map((comment) => (
              <li
                key={comment.id}
                style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}
              >
                <p>
                  <strong>작성자:</strong> {comment.email}|
                  <strong>내용:</strong> {comment.comment}
                </p>
                {editingCommentId === comment.id ? (
                  <>
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={3}
                      style={{ width: "100%", padding: "8px" }}
                    />
                    <button
                      onClick={handleUpdate}
                      style={{
                        marginTop: "4px",
                        padding: "4px 12px",
                        backgroundColor: "#FF9800",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      수정 완료
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(comment)}
                      style={{
                        marginRight: "8px",
                        padding: "4px 12px",
                        backgroundColor: "#FFC107",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "#F44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => navigate("/community")}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        목록으로
      </button>
    </>
  );
};
export default Comment;
