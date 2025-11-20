import { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 🔥 실제 API 연결 시 여기만 변경
    const sampleUsers = [
      {
        id: 1,
        username: "testuser",
        email: "test1@example.com",
        active: true,
        reports: 0,
      },
      {
        id: 2,
        username: "badguy",
        email: "bad@example.com",
        active: false,
        reports: 3,
      },
      {
        id: 3,
        username: "jenny",
        email: "jen@example.com",
        active: true,
        reports: 1,
      },
    ];
    setUsers(sampleUsers);
  }, []);

  // 활성/비활성 토글
  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  // 검색 필터
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-container">
      <h2 className="user-title">사용자 관리</h2>

      {/* 검색 입력창 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="사용자 검색 (이름 / 이메일)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>신고</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td className="username">{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.reports > 0 ? (
                  <span className="tag danger">{user.reports}회</span>
                ) : (
                  <span className="tag normal">0</span>
                )}
              </td>
              <td>
                {user.active ? (
                  <span className="tag active">활성</span>
                ) : (
                  <span className="tag inactive">비활성</span>
                )}
              </td>
              <td>
                <button
                  className={`btn-toggle ${user.active ? "off" : "on"}`}
                  onClick={() => toggleActive(user.id)}
                >
                  {user.active ? "비활성화" : "활성화"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
