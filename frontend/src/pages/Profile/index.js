import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserPostList from "./UserPostList";
import UserQnaList from "./UserQnaList";
import UserDelete from "./UserDelete";

import { getMyPosts, deletePost } from "../../api/Community";
import { getMyQna, deleteQna } from "../../api/Qna";

const Profile = ({ userInfo }) => {
  const navigate = useNavigate();

  // ------------------------------
  // 내가 작성한 게시물
  // ------------------------------
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      if (!userInfo.user_id) return;

      try {
        const res = await getMyPosts(userInfo.user_id);
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
  }, [userInfo.user_id]);

  // 게시글 수정
  const handleEditPost = (postId) => {
    navigate(`/community/edit/${postId}`);
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
      if (!userInfo.user_id) return;

      try {
        const res = await getMyQna(userInfo.user_id);
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
  }, [userInfo.user_id]);

  // Q&A 수정
  const handleEditQna = (qnaId) => {
    navigate(`/qna/edit/${qnaId}`);
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
      <h2 className="profile-title">내 활동 정보</h2>

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
