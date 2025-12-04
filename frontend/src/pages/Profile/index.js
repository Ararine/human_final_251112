import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import URL from "../../constants/url";

import UserInfo from "./UserInfo";
import UserPostList from "./UserPostList";
import UserDelete from "./UserDelete";

import { getPosts, deletePost } from "../../api/Community";
import { getMyQna } from "../../api/Qna";
import { getUserByUserId, updateUserByUserId } from "../../api/UserBase";

const Profile = ({ userInfo }) => {
  console.log(userInfo);
  const navigate = useNavigate();

  // 로그인 정보 안전 처리
  const safeUser =
    userInfo || JSON.parse(localStorage.getItem("userInfo")) || {};

  // 1) 개인정보 폼 상태
  const [form, setForm] = useState({
    email: safeUser.email || "",
    name: safeUser.name || safeUser.username || "",
    gender: safeUser.gender || "",
    age: safeUser.age || "",
    height: safeUser.height || "",
    weight: safeUser.weight || "",
  });

  // 2) 내가 작성한 게시글 목록
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const loadUserBaseInfo = async () => {
      if (!safeUser.user_id) return;

      try {
        const response = await getUserByUserId(safeUser.user_id);
        const user = response.data[0];
        const { age, gender, height, weight } = user;
        setForm({ age, gender, height, weight });
        // setMyPosts(posts.data || []);
      } catch (err) {
        console.error("유저 게시글 불러오기 실패:", err);
      }
    };
    loadUserBaseInfo();
  }, []);

  // 🔹 내가 작성한 게시글 프론트에서 필터링
  useEffect(() => {
    const loadPosts = async () => {
      if (!safeUser.user_id) return;

      try {
        const allPosts = await getPosts();

        console.log("전체 게시글:", allPosts);

        // data 배열만 꺼내기
        const postsArray = allPosts.data || [];

        const myFilteredPosts = postsArray.filter(
          (post) => post.user_id === safeUser.user_id
        );

        console.log("내 게시글:", myFilteredPosts);

        setMyPosts(myFilteredPosts);
      } catch (err) {
        console.error("유저 게시글 불러오기 실패:", err);
      }
    };

    loadPosts();
  }, [safeUser.user_id]);

  // 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 개인정보 저장 (아직 가짜)
  const handleSave = async (e) => {
    e.preventDefault();
    const { user_id } = safeUser;
    const { age, gender, height, weight } = form;

    const response = await updateUserByUserId(
      user_id,
      gender,
      age,
      height,
      weight
    );
    console.log("수정된 개인정보:", response);
    // alert("개인정보 저장(가짜). 나중에 서버 연결 예정.");
  };

  // 🔹 게시글 수정하기
  const handleEditPost = (postId) => {
    // navigate(`${URL.COMMUNITY_URL}/write/${postId}`);
    navigate(`/community/write/${postId}?from=profile`);
  };

  // 🔹 게시글 삭제하기
  const handleDeletePost = async (postId) => {
    const ok = window.confirm("이 게시글을 정말 삭제할까요?");
    if (!ok) return;

    try {
      await deletePost(postId); // API 호출
      setMyPosts((prev) => prev.filter((p) => p.id !== postId)); // 화면에서 제거
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  // 3) 내가 작성한 QnA
  const [myQna, setMyQna] = useState([]);

  useEffect(() => {
    const loadMyQna = async () => {
      if (!safeUser.id) return;

      try {
        const res = await getMyQna(safeUser.id);
        console.log("내 QnA 데이터:", res.data);
        setMyQna(res.data.data || []);
      } catch (err) {
        console.error("내 QnA 불러오기 실패:", err);
      }
    };

    loadMyQna();
  }, [safeUser.id]);

  return (
    <div className="profile-page">
      <h2 className="profile-title">마이페이지</h2>

      {/* 1. 개인정보 관리 */}
      <UserInfo
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
      />

      {/* 2. 내가 쓴 게시글 */}
      <UserPostList
        myPosts={myPosts}
        handleEditPost={handleEditPost}
        handleDeletePost={handleDeletePost}
      />
      {/* 3. 내가 쓴 QnA */}
      <section className="profile-section">
        <h3 className="section-title">내가 작성한 Q&A</h3>

        {myQna.length === 0 ? (
          <p className="empty-text">아직 작성한 Q&A가 없습니다.</p>
        ) : (
          <ul className="post-list">
            {myQna.map((qna) => (
              <li key={qna.id} className="post-item">
                <div className="post-title">{qna.title}</div>
                <div className="post-meta">작성일: {qna.created_at}</div>

                <div className="post-actions">
                  <button
                    className="btn-ghost small"
                    onClick={() => navigate(`/qna/${qna.id}`)}
                  >
                    보기
                  </button>
                  <button
                    className="btn-outline small"
                    // onClick={() => navigate(`/qna/write/${qna.id}`)}
                    onClick={() =>
                      navigate(`/qna/write/${qna.id}?from=profile`)
                    }
                  >
                    수정
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 4. 회원 탈퇴 */}
      <UserDelete />
    </div>
  );
};

export default Profile;
