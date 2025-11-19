import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { samplePosts } from "../constants/sample";
import DynamicTable from "../components/DynamicTable";
import { getPosts } from "../api/Community";

const Community = () => {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        alert("게시글 목록 불러오기 실패");
      }
    };
    fetchPost();
  }, []);

  const handleWritePost = () => {
    // 현재는 alert로 테스트
    // alert("게시글 작성 버튼 클릭됨!");

    // 실제 작성 페이지로 이동하고 싶으면
    navigate("/community/write");
  };

  return (
    <div style={{ padding: "20px" }}>
      <DynamicTable data={posts} rowsPerPage={10} />
      <button
        onClick={handleWritePost}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        게시글 쓰기
      </button>
    </div>
  );
};

export default Community;
