import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserInfo from "./UserInfo";
import UserPostList from "./UserPostList";
import UserQnaList from "./UserQnaList";
import UserDelete from "./UserDelete";

import { getMyPosts, deletePost } from "../../api/Community";
import { getMyQna, deleteQna } from "../../api/Qna";
import { getUserByUserId, updateUserByUserId } from "../../api/UserBase";

const Profile = ({ userInfo }) => {
  const navigate = useNavigate();

  // ------------------------------
  // 로그인 유저 정보 세팅
  // ------------------------------
  const safeUser =
    userInfo || JSON.parse(localStorage.getItem("userInfo")) || {};

  // ------------------------------
  // 개인정보 상태
  // ------------------------------
  const [form, setForm] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  // 🔥 개인정보 불러오기
  useEffect(() => {
    const loadUserBaseInfo = async () => {
      if (!safeUser.user_id) return;

      try {
        const response = await getUserByUserId(safeUser.user_id);
        const user = response.data[0];

        setForm({
          gender: user.gender || "",
          age: user.age || "",
          height: user.height || "",
          weight: user.weight || "",
        });
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    loadUserBaseInfo();
  }, [safeUser.user_id]);

  // ------------------------------
  // 개인정보 입력 핸들러
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 개인정보 저장
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateUserByUserId(
        safeUser.user_id,
        form.gender,
        form.age,
        form.height,
        form.weight
      );
      alert("개인정보가 저장되었습니다.");
    } catch (err) {
      console.error("개인정보 저장 실패:", err);
      alert("저장 실패");
    }
  };

  // ------------------------------
  // 내가 작성한 게시물
  // ------------------------------
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      if (!safeUser.user_id) return;

      try {
        const res = await getMyPosts(safeUser.user_id);
        const posts =
          res?.data?.data || // { data:[...] }
          res?.data || // 배열 자체
          [];

        setMyPosts(posts);
      } catch (err) {
        console.error("내 게시글 불러오기 실패:", err);
        setMyPosts([]);
      }
    };

    loadPosts();
  }, [safeUser.user_id]);

  // 게시글 수정
  const handleEditPost = (postId) => {
    navigate(`/community/edit/${postId}?from=profile`);
  };

  // 게시글 삭제
  const handleDeletePost = async (postId) => {
    if (!window.confirm("이 게시글을 정말 삭제할까요?")) return;

    try {
      await deletePost(postId);
      setMyPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      alert("삭제 실패했습니다.");
    }
  };

  // ------------------------------
  // 내가 작성한 Q&A
  // ------------------------------
  const [myQna, setMyQna] = useState([]);

  useEffect(() => {
    const loadQna = async () => {
      if (!safeUser.user_id) return;

      try {
        const res = await getMyQna(safeUser.user_id);
        const list =
          res?.data?.data || // { data:[...] }
          res?.data || // 배열 자체
          [];

        setMyQna(list);
      } catch (err) {
        console.error("내 QnA 불러오기 실패:", err);
      }
    };

    loadQna();
  }, [safeUser.user_id]);

  // Q&A 수정
  const handleEditQna = (qnaId) => {
    navigate(`/qna/edit/${qnaId}?from=profile`);
  };

  // Q&A 삭제
  const handleDeleteQna = async (qnaId) => {
    if (!window.confirm("이 Q&A를 정말 삭제할까요?")) return;

    try {
      await deleteQna(qnaId);
      setMyQna((prev) => prev.filter((q) => q.id !== qnaId));
    } catch (err) {
      console.error("QnA 삭제 실패:", err);
      alert("삭제 실패했습니다.");
    }
  };

  // ------------------------------
  // 렌더링
  // ------------------------------
  return (
    <div className="profile-page">
      <h2 className="profile-title">마이페이지</h2>

      {/* 1. 개인정보 관리 */}
      <UserInfo
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
      />

      {/* 2. 내가 작성한 게시물 */}
      <UserPostList
        myPosts={myPosts}
        handleEditPost={handleEditPost}
        handleDeletePost={handleDeletePost}
      />

      {/* 3. 내가 작성한 Q&A */}
      <UserQnaList
        myQna={myQna}
        handleEditQna={handleEditQna}
        handleDeleteQna={handleDeleteQna}
      />

      {/* 4. 회원 탈퇴 */}
      <UserDelete />
    </div>
  );
};

export default Profile;
