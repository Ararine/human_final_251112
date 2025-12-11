import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getQnaDetail, updateQna, deleteQna } from "../../api/Qna";
// import "../../css/form.css";

export default function QnaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get("from");

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  const [meta, setMeta] = useState({
    created_at: "",
    is_public: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQnaDetail(id);

        setForm({
          title: res.data.title,
          contents: res.data.contents,
        });

        setMeta({
          created_at: res.data.created_at,
          is_public: res.data.is_public,
        });
      } catch (err) {
        console.error(err);
        alert("Q&A 상세 불러오기 실패");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.contents) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    try {
      await updateQna(id, form);
      alert("Q&A 수정 완료");

      navigate(from === "profile" ? "/profile" : `/qna/${id}`);
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Q&A 수정하기</h2>

      {/* ← 여기 스타일 변경됨 */}
      <div className="form-meta">
        <p>
          작성일:{" "}
          {meta.created_at
            ? meta.created_at.slice(0, 16).replace("T", " ")
            : "-"}
        </p>
        <p>공개 여부: {meta.is_public === 1 ? "공개" : "비공개"}</p>
      </div>
      {/* ------------------------------- */}

      <div className="form-input-wrapper">
        <input
          type="text"
          name="title"
          className="form-input"
          value={form.title}
          onChange={handleChange}
        />
        <label className={`form-input-label ${form.title ? "active" : ""}`}>
          제목
        </label>
      </div>

      <div className="form-textarea-wrapper">
        <textarea
          name="contents"
          className="form-textarea"
          value={form.contents}
          onChange={handleChange}
        />
        <label
          className={`form-textarea-label ${form.contents ? "active" : ""}`}
        >
          내용
        </label>
      </div>

      <button className="form-btn-submit" onClick={handleSubmit}>
        수정 완료
      </button>
    </div>
  );
}
