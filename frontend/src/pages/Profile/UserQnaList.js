const UserQnaList = ({ myQna, handleEditQna, handleDeleteQna }) => {
  return (
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
                  type="button"
                  className="btn-ghost small"
                  onClick={() => handleEditQna(qna.id)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn-outline small"
                  onClick={() => handleDeleteQna(qna.id)}
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

export default UserQnaList;
