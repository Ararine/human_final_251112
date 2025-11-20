import { useState, useEffect } from "react";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    level: "",
  });

  useEffect(() => {
    // 🔥 실제 API 연결 시 여기를 호출
    const sampleExercises = [
      { id: 1, name: "스쿼트", category: "하체", level: "중급" },
      { id: 2, name: "벤치프레스", category: "가슴", level: "고급" },
      { id: 3, name: "풀업", category: "등", level: "고급" },
      { id: 4, name: "플랭크", category: "코어", level: "초급" },
    ];
    setExercises(sampleExercises);
  }, []);

  // 검색
  const filtered = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  // 모달 열기 (추가 or 수정)
  const openModal = (exercise = null) => {
    if (exercise) {
      setEditTarget(exercise.id);
      setForm({
        name: exercise.name,
        category: exercise.category,
        level: exercise.level,
      });
    } else {
      setEditTarget(null);
      setForm({ name: "", category: "", level: "" });
    }
    setModalOpen(true);
  };

  // 모달 저장
  const handleSave = () => {
    if (!form.name || !form.category || !form.level) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (editTarget) {
      // 수정
      setExercises((prev) =>
        prev.map((ex) => (ex.id === editTarget ? { ...ex, ...form } : ex))
      );
    } else {
      // 추가
      const newItem = {
        id: Date.now(),
        ...form,
      };
      setExercises((prev) => [...prev, newItem]);
    }

    setModalOpen(false);
  };

  // 삭제
  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <div className="exercise-container">
      <h2 className="exercise-title">운동 관리</h2>

      {/* 검색 + 추가 버튼 */}
      <div className="top-bar">
        <input
          type="text"
          className="search-input"
          placeholder="운동 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-add" onClick={() => openModal()}>
          운동 추가
        </button>
      </div>

      {/* 테이블 */}
      <table className="exercise-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>운동명</th>
            <th>카테고리</th>
            <th>난이도</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((ex) => (
            <tr key={ex.id}>
              <td>{ex.id}</td>
              <td className="name">{ex.name}</td>
              <td>{ex.category}</td>
              <td>{ex.level}</td>
              <td>
                <button className="btn-edit" onClick={() => openModal(ex)}>
                  수정
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(ex.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 모달 */}
      {modalOpen && (
        <div className="modal-bg">
          <div className="modal-box">
            <h3>{editTarget ? "운동 수정" : "운동 추가"}</h3>

            <label>운동명</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>카테고리</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <label>난이도</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option value="">선택</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>

            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                저장
              </button>
              <button
                className="btn-cancel"
                onClick={() => setModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
