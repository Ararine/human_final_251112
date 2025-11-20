import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import URL from "../../constants/url";

import UserInfo from "./UserInfo";
import UserPostList from "./UserPostList";
import UserDelete from "./UserDelete";

import { getPostsByUserId, deletePost } from "../../api/Community";

const Profile = ({ userInfo }) => {
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

  // 🔹 유저 게시글 목록 불러오기
  useEffect(() => {
    const loadPosts = async () => {
      if (!safeUser.id) return;

      try {
        const posts = await getPostsByUserId(safeUser.id);

        console.log("getPostsByUserId 결과:", posts);

        setMyPosts(posts.data || []);
      } catch (err) {
        console.error("유저 게시글 불러오기 실패:", err);
      }
    };

    loadPosts();
  }, [safeUser.id]);
  // 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 개인정보 저장 (아직 가짜)
  const handleSave = (e) => {
    e.preventDefault();
    console.log("수정된 개인정보:", form);
    alert("개인정보 저장(가짜). 나중에 서버 연결 예정.");
  };

  // 🔹 게시글 수정하기
  const handleEditPost = (postId) => {
    navigate(`${URL.COMMUNITY_URL}/write/${postId}`);
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

      {/* 3. 회원 탈퇴 */}
      <UserDelete />
    </div>
  );
};

export default Profile;
