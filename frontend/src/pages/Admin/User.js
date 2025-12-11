import { useState, useEffect } from "react";
import {
  deleteUserById,
  getUserAll,
  updateUserActiveById,
} from "../../api/User";

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const fetchUsers = async () => {
    try {
      const res = await getUserAll();
      console.log(res);
      setUsers(res.data);
    } catch (err) {
      console.error("유저 조회 실패:", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  /** 🔥 활성/비활성 토글 (1 <-> -1) */
  const handleToggleActive = async (user) => {
    try {
      const userId = user.id;
      const is_active = user.is_active;
      console.log(is_active);
      // API 요청 성공해야만 상태 변경
      await updateUserActiveById(userId, is_active);
      fetchUsers();
    } catch (err) {
      console.error("활성 상태 변경 실패:", err);
    }
  };

  /** 🔥 유저 삭제 */
  const handleDeleteUser = async (user) => {
    if (!window.confirm("정말 이 유저를 삭제하시겠습니까?")) return;
    const userId = user.id;
    await deleteUserById(userId);
    fetchUsers();
  };

  // 검색 필터
  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-container">
      <h2 className="user-title">사용자 관리</h2>

      {/* 검색 입력창 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="사용자 검색 (이메일)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table-nowrap">
        <thead>
          <tr>
            <th>ID</th>
            <th>이메일</th>
            <th>타입</th>
            <th>활성화 상태</th>
            <th>포인트</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>{user.points}</td>
              <td>
                <button
                  type="button"
                  className={`btn-toggle ${user.is_active == 1 ? "on" : "off"}`}
                  onClick={() => handleToggleActive(user)}
                >
                  {user.is_active == 1 ? "활성" : "비활성"}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDeleteUser(user)}
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

export default User;
