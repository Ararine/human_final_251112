import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQnaList } from "../../api/Qna";
import DynamicTable from "../../components/DynamicTable";

export default function Qna() {
  const [qnaList, setQnaList] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();

  // qna 게시글 클릭 시 해당 게시글로 이동
  useEffect(() => {
    if (selectedData?.id) {
      navigate(`/qna/${selectedData.id}`);
    }
  }, [selectedData, navigate]);

  // qna 작성하기 클릭 시 작성 페이지로 이동
  const handleWriteQna = () => {
    navigate("/qna/write");
  };

  const fetchQna = async () => {
    try {
      const data = await getQnaList();
      setQnaList(data.data);
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
      <div>
        <h2>Q&A</h2>
        <DynamicTable
          data={qnaList}
          setSelectedData={setSelectedData}
          rowsPerPage={10}
        />
        <button
          onClick={handleWriteQna}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Q&A 작성하기
        </button>
      </div>
    </>
  );
}
