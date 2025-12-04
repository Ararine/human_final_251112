/* 
TODO

공개/비공개 선택 버튼

*/
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  createPost,
  getPostDetail,
  updatePost,
  deletePost,
} from "../../../api/Community";

const CommunityWrite = ({ userInfo }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from"); // profile 또는 null

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postMeta, setPostMeta] = useState({
    id: "",
    create_at: "",
    is_public: "",
  });

  // 📌 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostDetail(id);
        const data = res.data[0];
        if (data) {
          setTitle(data.title);
          setContent(data.contents);
          setPostMeta({
            id: data.id,
            create_at: data.create_at,
            is_public: data.is_public,
          });
        } else {
          alert("존재하지 않는 게시글입니다.");
          navigate("/community");
        }
      } catch (error) {
        console.error(error);
        alert("게시글 불러오기 실패");
        navigate("/community");
      }
    };

    if (id) fetchPost();
  }, [id, navigate]);

  // 📌 저장(작성/수정)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      if (id) {
        // 🔹 수정
        await updatePost(id, { title, contents: content });
        alert("게시글 수정 완료!");
      } else {
        // 🔹 작성
        const userId = userInfo?.user_id;
        await createPost(title, content, userId);
        alert("게시글 작성 완료!");
      }

      // 📌 어디서 왔는지에 따라 이동 경로 결정
      if (from === "profile") {
        navigate("/profile");
      } else {
        navigate("/community");
      }
    } catch (error) {
      console.error(error);
      alert("게시글 저장에 실패했습니다.");
    }
  };

  // 📌 삭제하기
  const handleDelete = async () => {
    if (!window.confirm("정말 게시글을 삭제하시겠습니까?")) return;

    try {
      await deletePost(id);
      alert("게시글이 삭제되었습니다.");

      // 삭제 후 이동
      if (from === "profile") {
        navigate("/profile");
      } else {
        navigate("/community");
      }
    } catch (error) {
      console.error(error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 공개 여부 변환기
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

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>{id ? "게시글 수정" : "게시글 작성"}</h2>

      {id && (
        <div style={{ marginBottom: "20px" }}>
          <p>게시글 번호: {postMeta.id}</p>
          <p>
            게시일:
            {postMeta.create_at
              ? postMeta.create_at.slice(0, 16).replace("T", " ")
              : "-"}
          </p>
          <p>공개 여부: {getPublicStatus(postMeta.is_public)}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* 제목 */}
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <label
            style={{
              position: "absolute",
              left: "12px",
              top: title ? "-8px" : "50%",
              transform: title ? "none" : "translateY(-50%)",
              fontSize: title ? "12px" : "16px",
              color: "#888",
              transition: "0.2s",
              backgroundColor: "white",
              padding: "0 4px",
              pointerEvents: "none",
            }}
          >
            제목
          </label>
        </div>

        {/* 내용 */}
        <div style={{ position: "relative", width: "100%" }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 12px",
              fontSize: "16px",
              fontFamily: "inherit",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              minHeight: "200px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
          <label
            style={{
              position: "absolute",
              left: "12px",
              top: content ? "-8px" : "16px",
              fontSize: content ? "12px" : "16px",
              color: "#888",
              transition: "0.2s",
              pointerEvents: "none",
              backgroundColor: "white",
              padding: "0 4px",
            }}
          >
            내용
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          {id ? "수정 완료" : "작성 완료"}
        </button>

        {id && (
          <button
            type="button"
            onClick={handleDelete}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            삭제
          </button>
        )}
      </form>
    </div>
  );
};

export default CommunityWrite;
