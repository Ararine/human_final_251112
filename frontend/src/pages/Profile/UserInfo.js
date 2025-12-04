import { useState } from "react";

const UserInfo = ({ form, handleChange, handleSave }) => {
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
  });

  const validateNumber = (name, value, min, max) => {
    if (value === "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const num = Number(value);

    if (isNaN(num) || num < min || num > max) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${min}~${max} 사이의 숫자를 입력하세요.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="profile-section">
      <h3 className="section-title">개인정보 관리</h3>

      <form className="profile-form" onSubmit={handleSave}>
        {/* 성별 */}
        <div className="profile-field">
          <label>성별</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        {/* 나이 */}
        <div className="profile-field">
          <label>나이</label>
          <input
            type="number"
            name="age"
            value={form.age}
            placeholder="나이를 입력하세요"
            onChange={(e) => {
              handleChange(e);
              validateNumber("age", e.target.value, 1, 100);
            }}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        {/* 키 */}
        <div className="profile-field">
          <label>키 (cm)</label>
          <input
            type="number"
            name="height"
            value={form.height}
            placeholder="키를 입력하세요"
            onChange={(e) => {
              handleChange(e);
              validateNumber("height", e.target.value, 100, 230);
            }}
          />
          {errors.height && <span className="error-text">{errors.height}</span>}
        </div>

        {/* 몸무게 */}
        <div className="profile-field">
          <label>몸무게 (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            placeholder="몸무게 입력하세요"
            onChange={(e) => {
              handleChange(e);
              validateNumber("weight", e.target.value, 20, 200);
            }}
          />
          {errors.weight && <span className="error-text">{errors.weight}</span>}
        </div>

        <button type="submit" className="btn-primary">
          수정하기
        </button>
      </form>
    </section>
  );
};

export default UserInfo;
