import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPostDetail, updatePost } from "../../../api/Community";

export default function CommunityWrite({ userInfo }) {
  const { id } = useParams();
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
      if (id) {
        await updatePost(id, form.title, form.contents);
      } else {
        await createPost(form.title, form.contents);
      }
      alert("게시글 작성 완료!");
      navigate("/community");
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  const fetchPostData = async () => {
    try {
      if (id) {
        const data = await getPostDetail(id);
        setForm(data.data[0]);
      }
    } catch (err) {
      console.error("데이터 불러오기 실패", err);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, [id]);
  return (
    <div
      className="community-container flex-column flex-center black"
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
        <h2 className="form-title">게시글 작성하기</h2>
        <div className="flex-column">
          <input
            type="text"
            name="title"
            placeholder="제목"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex-column">
          <label>내용</label>
          <textarea
            name="contents"
            placeholder="내용"
            value={form.contents}
            onChange={handleChange}
            rows={10}
          />
        </div>

        <button
          className="bg-blue btn-ghost"
          onClick={handleSubmit}
          style={{ width: "100%" }}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}
