import { useState, useEffect } from "react";
import {
  createExercise,
  getExercises,
  updateExercise,
  deleteExercise,
} from "../../api/exercise";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    link: "",
  });
  const loadExercises = async () => {
    try {
      const data = await getExercises();
      setExercises(data.data);
    } catch (err) {
      console.error("운동 불러오기 실패:", err);
    }
  };
  useEffect(() => {
    loadExercises();
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
        category: exercise.type,
        link: exercise.link,
      });
    } else {
      setEditTarget(null);
      setForm({ name: "", category: "", link: "" });
    }
    setModalOpen(true);
  };

  // 모달 저장
  const handleSave = async () => {
    if (!form.name || !form.category) {
      alert("운동명과 카테고리는 필수입니다.");
      return;
    }

    try {
      if (editTarget) {
        // 수정
        console.log(form);
        await updateExercise(editTarget, form.name, form.category, form.link);
      } else {
        // 추가
        await createExercise(null, form.name, form.category, form.link);
      }

      await loadExercises();
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
      await deleteExercise(id);
      await loadExercises();
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <div className="exercise-container">
      <h2 className="exercise-title">운동 관리</h2>

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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>운동명</th>
            <th>카테고리</th>
            <th>링크</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((ex) => (
            <tr key={ex.id}>
              <td>{ex.id}</td>
              <td>{ex.name}</td>
              <td>{ex.type}</td>
              <td>
                {ex.link ? (
                  <a href={ex.link} target="_blank" rel="noopener noreferrer">
                    보기
                  </a>
                ) : (
                  "-"
                )}
              </td>
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
            <label>링크</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="운동 영상이나 자료 링크"
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

export default Exercise;
