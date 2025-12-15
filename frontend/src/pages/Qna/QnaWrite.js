import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQna } from "../../api/Qna";

export default function QnaWrite({ userInfo }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userInfo?.user_id) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!form.title || !form.contents) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await createQna(userInfo?.user_id, form);
      alert("Q&A 등록 완료");
      navigate("/qna");
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <div
      className="qna-container flex-column flex-center black"
      style={{
        minWidth: "60%",
        width: "60%",
        margin: "20px auto",
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      <div
        className="card bg-white flex-column gap-5"
        style={{ width: "100%" }}
      >
        <h2>Q&A 작성하기</h2>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="contents"
          placeholder="내용"
          rows="10"
          value={form.contents}
          onChange={handleChange}
        />

        <button className="bg-blue btn-ghost" onClick={handleSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
}
