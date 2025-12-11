const UserPostList = ({ myPosts, handleEditPost, handleDeletePost }) => {
  return (
    <section className="profile-section">
      <h3 className="section-title">내가 작성한 게시글</h3>

      {myPosts.length === 0 ? (
        <p className="empty-text">아직 작성한 게시글이 없습니다.</p>
      ) : (
        <ul className="post-list">
          {myPosts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-title">{post.title}</div>
              <div className="post-meta">작성일:{post.created_at}</div>

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
  );
};

export default UserPostList;
