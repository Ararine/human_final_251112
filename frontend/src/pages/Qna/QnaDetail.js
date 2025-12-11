import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getQnaDetail, deleteQna } from "../../api/Qna";

export default function QnaDetail({ userInfo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qna, setQna] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getQnaDetail(id);
        setQna(res.data);
      } catch (err) {
        console.error(err);
        alert("상세 불러오기 실패");
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await deleteQna(id);
      alert("삭제 완료");
      navigate("/qna");
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  // const handleEdit = () => {
  //   navigate(`/qna/write?id=${id}`, { state: qna });
  // };
  const handleEdit = () => {
    navigate(`/qna/edit/${id}?from=profile`);
  };

  if (!qna) return <div>로딩중...</div>;
  return (
    <div
      className="qna-container flex-column black"
      style={{
        minWidth: "60%",
        width: "60%",
        margin: "20px auto",
        padding: "0 16px",
      }}
    >
      <div className="card bg-white">
        <h2>제목: {qna.title}</h2>
        <div className="post-content">
          <p>{qna.contents}</p>
        </div>

        {userInfo?.user_id === qna.user_id && (
          <div className="flex-end">
            <button className="bg-green" onClick={handleEdit}>
              수정
            </button>
            <button className="bg-red" onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
