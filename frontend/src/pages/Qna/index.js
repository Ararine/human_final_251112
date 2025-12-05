import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQnaList } from "../../api/Qna";
import DynamicTable from "../../components/DynamicTable";

function renameKeys(obj, newKeys) {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = newKeys[key] || key;
    acc[newKey] = obj[key];
    return acc;
  }, {});
}

export default function Qna() {
  const [qnaList, setQnaList] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();

  // qna 게시글 클릭 시 해당 게시글로 이동
  useEffect(() => {
    if (selectedData?.["게시 번호"]) {
      const post_id = selectedData["게시 번호"];
      navigate(`/qna/${post_id}`);
    }
  }, [selectedData, navigate]);

  // qna 작성하기 클릭 시 작성 페이지로 이동
  const handleWriteQna = () => {
    navigate("/qna/write");
  };

  const fetchQna = async () => {
    try {
      const res = await getQnaList();
      let data = res.data;
      data = data
        .map(({ user_id, ...rest }) => rest)
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
          created_at: "생성일",
          updated_at: "수정일",
        });

        // 2️⃣ 키 순서 재정렬
        const sorted = {};
        keyOrder.forEach((key) => {
          sorted[key] = renamed[key];
        });

        return sorted;
      });

      setQnaList(data);
    } catch (error) {
      console.error(error);
      alert("QnA 목록 불러오기 실패");
    }
  };
  useEffect(() => {
    fetchQna();
  }, []);

  return (
    <>
      <div className="qna-container">
        <h2>Q&A</h2>
        <DynamicTable
          data={qnaList}
          setSelectedData={setSelectedData}
          rowsPerPage={10}
        />
        <button onClick={handleWriteQna} className="bg-darkgray btn-ghost">
          Q&A 작성하기
        </button>
      </div>
    </>
  );
}
