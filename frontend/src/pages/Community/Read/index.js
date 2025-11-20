import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Comment from "./Comment";
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "../../../api/Comment";
import { createPostReport, getPostDetail } from "../../../api/Community";
import {
  getPostReactionById,
  updatePostReactionById,
} from "../../../api/Reaction";

const CommunityRead = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reporting, setReporting] = useState(false); // 신고 입력창 표시 여부
  const [reportReason, setReportReason] = useState(""); // 신고 사유
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [post, setPost] = useState({
    id: "",
    title: "",
    contents: "",
    create_at: "",
    is_public: "",
  });
  const fetchReactions = async () => {
    try {
      const reactionRes = await getPostReactionById(id);
      const reactions = reactionRes.data || [];
      const likesCount = reactions.filter(
        (r) => r.reaction_type === "like"
      ).length;
      const dislikesCount = reactions.filter(
        (r) => r.reaction_type === "dislike"
      ).length;

      setLikes(likesCount);
      setDislikes(dislikesCount);
    } catch (error) {
      console.error("게시글 반응 불러오기 실패:", error);
      alert("게시글 반응을 불러오는 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    fetchReactions();
  }, [id]);

  const handleReaction = async (type) => {
    try {
      await updatePostReactionById(id, { user_id: 1, reaction_type: type });
      fetchReactions();
    } catch (error) {
      console.error(error);
      alert("반응 처리 실패");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostDetail(id);
        const data = res.data[0];
        if (!data) {
          alert("존재하지 않는 게시글입니다.");
          navigate("/community");
          return;
        }

        setPost({
          id: data.id,
          title: data.title,
          email: data.email,
          contents: data.contents || "",
          create_at: data.create_at || "",
          is_public: data.is_public || "0",
        });
      } catch (error) {
        console.error(error);
        alert("게시글 불러오기 실패");
        navigate("/community");
      }
    };

    const fetchComments = async () => {
      try {
        const res = await getCommentsByPostId(id);
        setComments(res.data || []);
      } catch (error) {
        console.error(error);
        alert("댓글 불러오기 실패");
      }
    };
    fetchPost();
    fetchComments();
  }, [id, navigate]);

  const getPublicStatus = (value) => {
    switch (value) {
      case "1":
        return "공개";
      case "0":
        return "비공개";
      case "-1":
        return "숨김";
      default:
        return "-";
    }
  };

  // 게시일 시:분까지만 표시
  const formatDate = (dateStr) => {
    return dateStr ? dateStr.slice(0, 16).replace("T", " ") : "-";
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error(error);
      alert("댓글 삭제 실패");
    }
  };

  const handleCreateComment = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    } else {
      // 사용자 id는 향후 수정 예정
      try {
        await createComment(id, newComment, 1);
        const res = await getCommentsByPostId(id);
        setComments(res.data || []);
        setNewComment("");
      } catch (error) {
        alert("댓글 작성에 실패하였습니다.");
      }
    }
  };
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdate = async () => {
    try {
      await updateComment(editingCommentId, editingContent);
      const res = await getCommentsByPostId(id);
      setComments(res.data || []);
      setEditingCommentId(null);
      setEditingContent("");
    } catch (error) {
      console.error(error);
      alert("댓글 수정 실패");
    }
  };
  const handleClipBoard = async () => {
    try {
      const url = window.location.href; // 현재 URL
      await navigator.clipboard.writeText(url);
      alert("게시글 링크가 클립보드에 복사되었습니다!");
    } catch (error) {
      alert("복사에 실패했습니다.");
      console.error("Clipboard error:", error);
    }
  };

  const handleReportClick = () => {
    setReporting(true);
  };
  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }
    try {
      // TODO: 신고 API 호출
      // 사용자 id는 향후 수정 예정
      await createPostReport(id, 1, reportReason);

      // await reportPost(post.id, reportReason);
      alert("신고가 접수되었습니다.");
      setReportReason("");
      setReporting(false);
    } catch (error) {
      console.error("신고 처리 중 오류:", error);
      if (error.status == 409) {
        alert("이미 신고 접수중인 게시글입니다.");
      } else {
        alert("신고 처리에 실패했습니다.");
      }
    }
  };
  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 16px" }}>
      <h2>게시글 상세보기</h2>
      <div style={{ marginBottom: "16px" }}>
        <p>
          <strong>게시글 번호:</strong> {post.id}
        </p>
        <p>
          <strong>게시자:</strong> {post.email}
        </p>
        <p>
          <strong>게시일:</strong> {formatDate(post.create_at)}
        </p>
        <p>
          <strong>공개 여부:</strong> {getPublicStatus(post.is_public)}
        </p>
        {/* 링크 복사 버튼 추가 */}
        <button
          onClick={handleClipBoard}
          style={{
            marginTop: "8px",
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          링크 복사
        </button>
        {/* 신고 버튼 */}
        <button
          onClick={handleReportClick}
          style={{
            marginTop: "8px",
            padding: "6px 12px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          신고
        </button>
        {/* 신고 입력창 */}
        {reporting && (
          <div style={{ marginTop: "8px" }}>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="신고 사유를 입력해주세요."
              rows={3}
              style={{ width: "100%", padding: "8px" }}
            />
            <button
              onClick={handleReportSubmit}
              style={{
                marginTop: "4px",
                padding: "6px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              제출
            </button>
            <button
              onClick={() => setReporting(false)}
              style={{
                marginTop: "4px",
                marginLeft: "8px",
                padding: "6px 12px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              취소
            </button>
          </div>
        )}
        {/* 좋아요 / 싫어요 */}
        <div style={{ marginTop: "12px" }}>
          <button
            onClick={() => handleReaction("like")}
            style={{
              padding: "6px 12px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            👍 좋아요 ({likes})
          </button>
          <button
            onClick={() => handleReaction("dislike")}
            style={{
              padding: "6px 12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            👎 싫어요 ({dislikes})
          </button>
        </div>
      </div>
      <hr />
      <div style={{ marginTop: "16px" }}>
        <h3>{post.title}</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{post.contents}</p>
      </div>
      <Comment
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCreateComment={handleCreateComment}
        editingCommentId={editingCommentId}
        editingContent={editingContent}
        setEditingContent={setEditingContent}
        handleUpdate={handleUpdate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default CommunityRead;
