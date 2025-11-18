import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { samplePosts } from "../constants/sample"; // 샘플 데이터

const CommunityWrite = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      // id가 있으면 기존 데이터를 가져와서 수정 모드로
      const post = samplePosts.find((p) => p.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      } else {
        alert("존재하지 않는 게시글입니다.");
        navigate("/community");
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (id) {
      // 수정 모드
      alert(`게시글 수정 완료!\nID: ${id}\n제목: ${title}\n내용: ${content}`);
      // 실제 서버 연동 시 PUT 요청 등으로 처리
    } else {
      // 새 게시글 작성 모드
      alert(`게시글 작성 완료!\n제목: ${title}\n내용: ${content}`);
      // 실제 서버 연동 시 POST 요청 등으로 처리
    }

    navigate("/community");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>{id ? "게시글 수정" : "게시글 작성"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="content"
            style={{ display: "block", marginBottom: "5px" }}
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
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
          }}
        >
          {id ? "수정 완료" : "작성 완료"}
        </button>
      </form>
    </div>
  );
};

export default CommunityWrite;
