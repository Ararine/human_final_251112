import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getPostDetail, updatePost, deletePost } from "../../api/Community";
import "../../css/form.css";

export default function CommunityEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const from = new URLSearchParams(useLocation().search).get("from");

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  const [meta, setMeta] = useState({
    create_at: "",
    is_public: "",
  });

  // 데이터 로드
  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await getPostDetail(id);
        const data = res.data[0];

        setForm({ title: data.title, contents: data.contents });

        setMeta({
          create_at: data.create_at,
          is_public: data.is_public,
        });
      } catch (err) {
        console.error(err);
        alert("게시글 불러오기 실패");
        navigate("/community");
      }
    };

    loadPost();
  }, [id, navigate]);

  // 입력 핸들러
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 수정 제출
  const handleSubmit = async () => {
    if (!form.title || !form.contents) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    try {
      await updatePost(id, form);
      alert("게시글 수정 완료");

      navigate(from === "profile" ? "/profile" : `/community/read/${id}`);
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">게시글 수정하기</h2>

      <div className="form-meta">
        <p>
          작성일:{" "}
          {meta.create_at ? meta.create_at.slice(0, 16).replace("T", " ") : "-"}
        </p>
        <p>공개 여부: {meta.is_public === "1" ? "공개" : "비공개"}</p>
      </div>

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
