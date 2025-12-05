/* 커뮤니티 전반적으로 리팩토링 필요 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { samplePosts } from "../constants/sample";
import DynamicTable from "../../components/DynamicTable";
import { getPosts } from "../../api/Community";

function renameKeys(obj, newKeys) {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = newKeys[key] || key;
    acc[newKey] = obj[key];
    return acc;
  }, {});
}

const Community = () => {
  const [posts, setPosts] = useState();
  const [selectedData, setSelectedData] = useState(null); // 선택된 행 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPosts();
        let data = res.data;
        data = data
          .map(({ is_public, user_id, ...rest }) => rest)
          .map((obj) =>
            Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [
                key,
                value === "NaT" || value === null ? "-" : value,
              ])
            )
          );
        const keyOrder = [
          "게시 번호",
          "제목",
          "게시 내용",
          "게시자",
          "생성일",
          "수정일",
        ];

        data = data.map((item) => {
          // 1️⃣ 키 이름 변경
          const renamed = renameKeys(item, {
            id: "게시 번호",
            email: "게시자",
            contents: "게시 내용",
            title: "제목",
            create_at: "생성일",
            updated_at: "수정일",
          });

          // 2️⃣ 키 순서 재정렬
          const sorted = {};
          keyOrder.forEach((key) => {
            sorted[key] = renamed[key];
          });

          return sorted;
        });

        setPosts(data);
      } catch (error) {
        console.error(error);
        alert("게시글 목록 불러오기 실패");
      }
    };
    fetchPost();
  }, []);
  useEffect(() => {
    if (selectedData?.["게시 번호"]) {
      const post_id = selectedData["게시 번호"];
      navigate(`/community/read/${post_id}`);
    }
  }, [selectedData, navigate]);

  const handleWritePost = () => {
    // 현재는 alert로 테스트
    // alert("게시글 작성 버튼 클릭됨!");

    // 실제 작성 페이지로 이동하고 싶으면
    navigate("/community/write");
  };

  return (
    <div className="community-container">
      <h2>커뮤니티</h2>
      <DynamicTable
        data={posts}
        setSelectedData={setSelectedData}
        rowsPerPage={10}
      />
      <button className="bg-darkgray btn-ghost" onClick={handleWritePost}>
        게시글 쓰기
      </button>
    </div>
  );
};

export default Community;
