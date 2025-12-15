import { useState, useEffect } from "react";
import {
  getPostReport,
  recoverPostReport,
  deletePostAdmin,
} from "../../api/Community";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await getPostReport();
      setPosts(res.data);
    } catch (err) {
      alert("신고 데이터 가져오기 실패");
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRecover = async (post) => {
    console.log(post);

    try {
      const post_id = post.post_id;
      const user_id = post.user_id;
      await recoverPostReport(post_id, user_id);
      alert("게시글이 복구되었습니다.");
      fetchPosts();
    } catch (err) {
      alert("게시글 복구 실패");
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm("정말 게시글을 삭제하시겠습니까?")) return;

    try {
      const post_id = post.post_id;
      const user_id = post.user_id;
      await deletePostAdmin(post_id, user_id);
      alert("게시글이 삭제되었습니다.");
      fetchPosts();
    } catch (err) {
      alert("게시글 삭제 실패");
    }
  };

  return (
    <div className="postlist-container">
      <h2 className="postlist-title">게시글 관리</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>신고내용</th>
            <th>내용</th>
            <th>신고일</th>
            <th>복구</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.email}</td>
              <td className="title">{post.title}</td>
              <td className="post-content">{post.comments}</td>
              <td className="post-content">{post.contents}</td>
              <td>{post.reported_at}</td>
              <td>
                <button
                  className="recover-btn"
                  onClick={() => handleRecover(post)}
                >
                  복구
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post)}
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
