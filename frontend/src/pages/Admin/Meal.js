import { useEffect, useState } from "react";

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({
    name: "",
    calories: "",
    type: "",
  });

  useEffect(() => {
    // 🔥 실제 API 연결 시 이 부분을 API로 교체
    const sampleMeals = [
      { id: 1, name: "닭가슴살 샐러드", calories: 350, type: "점심" },
      { id: 2, name: "귀리 + 바나나", calories: 420, type: "아침" },
      { id: 3, name: "연어 스테이크", calories: 620, type: "저녁" },
      { id: 4, name: "프로틴 쉐이크", calories: 180, type: "간식" },
    ];
    setMeals(sampleMeals);
  }, []);

  // 검색 필터
  const filtered = meals.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // 모달 열기
  const openModal = (meal = null) => {
    if (meal) {
      setEditTarget(meal.id);
      setForm({
        name: meal.name,
        calories: meal.calories,
        type: meal.type,
      });
    } else {
      setEditTarget(null);
      setForm({ name: "", calories: "", type: "" });
    }
    setModalOpen(true);
  };

  // 모달 저장
  const handleSave = () => {
    if (!form.name || !form.calories || !form.type) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (editTarget) {
      // 수정
      setMeals((prev) =>
        prev.map((m) => (m.id === editTarget ? { ...m, ...form } : m))
      );
    } else {
      // 추가
      const newMeal = {
        id: Date.now(),
        ...form,
      };
      setMeals((prev) => [...prev, newMeal]);
    }

    setModalOpen(false);
  };

  // 삭제
  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="meal-container">
      <h2 className="meal-title">식단 관리</h2>

      {/* 검색 + 추가 */}
      <div className="top-bar">
        <input
          type="text"
          className="search-input"
          placeholder="식단 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-add" onClick={() => openModal()}>
          식단 추가
        </button>
      </div>

      {/* 테이블 */}
      <table className="meal-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>식단명</th>
            <th>칼로리</th>
            <th>종류</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.id}</td>
              <td className="name">{meal.name}</td>
              <td>{meal.calories} kcal</td>
              <td>{meal.type}</td>
              <td>
                <button className="btn-edit" onClick={() => openModal(meal)}>
                  수정
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(meal.id)}
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
            <h3>{editTarget ? "식단 수정" : "식단 추가"}</h3>

            <label>식단명</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>칼로리</label>
            <input
              type="number"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
            />

            <label>종류</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">선택</option>
              <option value="아침">아침</option>
              <option value="점심">점심</option>
              <option value="저녁">저녁</option>
              <option value="간식">간식</option>
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

export default Meal;
