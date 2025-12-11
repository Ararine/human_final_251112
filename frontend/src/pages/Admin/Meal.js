import { useEffect, useState } from "react";
import {
  createBaseMeal,
  getBaseMeal,
  updateBaseMealByMealId,
  deleteBaseMealByMealId,
} from "../../api/Meal";

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({
    name: "",
    calories: "",
    link: "",
  });

  // API에서 식단 불러오기
  const loadMeals = async () => {
    try {
      const data = await getBaseMeal();
      setMeals(data.data || []);
    } catch (err) {
      console.error("식단 불러오기 실패:", err);
      alert("식단 불러오기 실패");
    }
  };

  useEffect(() => {
    loadMeals();
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
        link: meal.link || "",
      });
    } else {
      setEditTarget(null);
      setForm({ name: "", calories: "", link: "" });
    }
    setModalOpen(true);
  };

  // 모달 저장
  const handleSave = async () => {
    if (!form.name || !form.calories) {
      alert("식단명과 칼로리는 필수입니다!");
      return;
    }

    try {
      if (editTarget) {
        await updateBaseMealByMealId(
          editTarget,
          form.name,
          form.calories,
          form.link
        );
      } else {
        await createBaseMeal(form.name, form.calories, form.link);
      }

      await loadMeals();
      setModalOpen(false);
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장에 실패했습니다.");
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteBaseMealByMealId(id);
      await loadMeals();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="meal-container">
      <h2 className="meal-title">식단 관리</h2>

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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>식단명</th>
            <th>칼로리</th>
            <th>링크</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.id}</td>
              <td className="name">{meal.name}</td>
              <td>{meal.calories} kcal</td>
              <td>
                {meal.link ? (
                  <a href={meal.link} target="_blank" rel="noopener noreferrer">
                    보기
                  </a>
                ) : (
                  "-"
                )}
              </td>
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

            <label>링크</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="영상/자료 링크 (선택)"
            />

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
