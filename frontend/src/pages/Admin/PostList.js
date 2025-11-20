import { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // 🔥 실제 API 연결 시 여기만 수정하면 됨
  useEffect(() => {
    // 예시 데이터
    const samplePosts = [
      {
        id: 1,
        title: "운동 루틴 공유합니다!",
        author: "User1",
        created_at: "2024-03-01",
        views: 121,
        reported: false,
      },
      {
        id: 2,
        title: "식단 추천해주세요",
        author: "User2",
        created_at: "2024-03-02",
        views: 87,
        reported: true,
      },
    ];
    setPosts(samplePosts);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="postlist-container">
      <h2 className="postlist-title">게시글 관리</h2>

      <table className="postlist-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td className="title">{post.title}</td>
              <td>{post.author}</td>
              <td>{post.created_at}</td>
              <td>{post.views}</td>
              <td>
                {post.reported ? (
                  <span className="tag danger">신고됨</span>
                ) : (
                  <span className="tag normal">정상</span>
                )}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
