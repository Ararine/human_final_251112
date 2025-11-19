import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail } from "../../api/Community";

const CommunityRead = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    id: "",
    title: "",
    contents: "",
    create_at: "",
    is_public: "",
  });

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
    fetchPost();
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

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 16px" }}>
      <h2>게시글 상세보기</h2>
      <div style={{ marginBottom: "16px" }}>
        <p>
          <strong>게시글 번호:</strong> {post.id}
        </p>
        <p>
          <strong>게시일:</strong> {formatDate(post.create_at)}
        </p>
        <p>
          <strong>공개 여부:</strong> {getPublicStatus(post.is_public)}
        </p>
      </div>
      <hr />
      <div style={{ marginTop: "16px" }}>
        <h3>{post.title}</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{post.contents}</p>
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
    </div>
  );
};

export default CommunityRead;
