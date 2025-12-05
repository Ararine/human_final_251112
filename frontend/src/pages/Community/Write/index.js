import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../api/Community";
import "../../../css/form.css";

export default function CommunityWrite({ userInfo }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.contents.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await createPost(form.title, form.contents, userInfo?.user_id);
      alert("게시글 작성 완료!");
      navigate("/community");
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">게시글 작성하기</h2>

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
        작성 완료
      </button>
    </div>
  );
}
