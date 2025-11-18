import { samplePosts } from "../constants/sample";
import DynamicTable from "../components/DynamicTable";
import { useState } from "react";

const Community = () => {
  const [posts, setPosts] = useState(samplePosts);

  const handleWritePost = () => {
    // 현재는 alert로 테스트
    alert("게시글 작성 버튼 클릭됨!");

    // 실제 작성 페이지로 이동하고 싶으면
    // window.location.href = "/write"; 처럼 구현 가능
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
      </button>{" "}
    </div>
  );
};

export default Community;
