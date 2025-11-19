// src/pages/Profile.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../constants/url";

const Profile = ({ userInfo }) => {
  const navigate = useNavigate();

  // App에서 안 넘겨줘도 안터지게 방어
  const safeUser = userInfo || {};

  // 1) 개인정보 폼 상태
  const [form, setForm] = useState({
    email: safeUser.email || "",
    name: safeUser.name || safeUser.username || "",
    gender: safeUser.gender || "",
    age: safeUser.age || "",
    height: safeUser.height || "",
    weight: safeUser.weight || "",
  });

  // 2) 내가 작성한 게시글 – 지금은 가짜 데이터 + 수정/삭제 테스트용
  const [myPosts, setMyPosts] = useState([
    { id: 1, title: "첫 홈트 시작 후기", createdAt: "2025-11-10" },
    { id: 2, title: "스쿼트 자세 교정 팁", createdAt: "2025-11-12" },
  ]);

  // ✅ 인풋 변경 핸들러 (한 번만!)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ 개인정보 저장 (지금은 알림만)
  const handleSave = (e) => {
    e.preventDefault();

    // 나중에 실제 API 붙일 때:
    // await api.put("/users/me", form);

    console.log("수정된 개인정보:", form);
    alert("개인정보 저장(가짜). 나중에 서버랑 연동하면 실제로 저장됩니다.");
  };

  // ✅ 회원 탈퇴 (지금은 알림만)
  const handleDeleteAccount = () => {
    const ok = window.confirm(
      "정말 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (!ok) return;

    // 나중에 실제 API:
    // await api.delete("/users/me");
    // localStorage.removeItem("userInfo");
    // navigate("/");

    alert("회원 탈퇴 기능은 서버 연동 시 구현 예정입니다.");
  };

  // ✅ 게시글 “수정하기”
  const handleEditPost = (postId) => {
    // 글쓰기 페이지를 수정 모드로 사용 ( /community/write/:id )
    navigate(`${URL.COMMUNITY_URL}/write/${postId}`);

    // 나중에:
    // 1) /community/write/:id 들어오면 postId로 글 상세 API 호출
    // 2) 불러온 내용으로 에디터 채워놓고 수정 → 저장
  };

  // ✅ 게시글 “삭제하기”
  const handleDeletePost = (postId) => {
    const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!ok) return;

    // 프론트에서만 목록에서 제거
    setMyPosts((prev) => prev.filter((post) => post.id !== postId));

    // 나중에:
    // await api.delete(`/posts/${postId}`);
    // 삭제 성공 후 setMyPosts로 다시 목록 반영
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">마이페이지</h2>

      {/* 1. 개인정보 관리 영역 */}
      <section className="profile-section">
        <h3 className="section-title">개인정보 관리</h3>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-row">
            <label className="form-label">이메일</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              disabled // 이메일은 보통 수정 불가
            />
          </div>

          <div className="form-row">
            <label className="form-label">이름</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">성별</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">나이</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">키 (cm)</label>
            <input
              name="height"
              type="number"
              value={form.height}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">몸무게 (kg)</label>
            <input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn-primary">
              저장하기
            </button>
          </div>
        </form>
      </section>

      {/* 2. 내 게시글 관리 영역 */}
      <section className="profile-section">
        <h3 className="section-title">내가 작성한 게시글</h3>

        {myPosts.length === 0 ? (
          <p className="empty-text">아직 작성한 게시글이 없습니다.</p>
        ) : (
          <ul className="post-list">
            {myPosts.map((post) => (
              <li key={post.id} className="post-item">
                <div className="post-title">{post.title}</div>
                <div className="post-meta">작성일: {post.createdAt}</div>

                {/* 🔹 여기서 수정 / 삭제 버튼 */}
                <div className="post-actions">
                  <button
                    type="button"
                    className="btn-ghost small"
                    onClick={() => handleEditPost(post.id)}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="btn-outline small"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 3. 회원 탈퇴 영역 */}
      <section className="profile-section danger">
        <h3 className="section-title">회원 탈퇴</h3>
        <p className="danger-text">
          탈퇴 시 데이터가 모두 삭제되며, 되돌릴 수 없습니다.
        </p>
        <button
          className="btn-outline danger-btn"
          onClick={handleDeleteAccount}
        >
          회원 탈퇴
        </button>
      </section>
    </div>
  );
};

export default Profile;
