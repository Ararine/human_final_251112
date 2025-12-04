import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQna } from "../../api/Qna";

export default function QnaWrite() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("🔍 QnaWrite userInfo:", user);

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!form.title || !form.contents) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await createQna(user.id, form);
      alert("Q&A 등록 완료");
      navigate("/qna");
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Q&A 작성하기</h2>

      <input
        type="text"
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        name="contents"
        placeholder="내용"
        rows="10"
        value={form.contents}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={handleSubmit}
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
        등록하기
      </button>
    </div>
  );
}
