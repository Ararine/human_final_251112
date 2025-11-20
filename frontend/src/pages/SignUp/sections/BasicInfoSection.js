const BasicInfoSection = ({ form, handleChange }) => {
  return (
    <section className="signup-section">
      <h3 className="section-title">기본 정보</h3>

      <div className="form-row">
        <label className="form-label">이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <label className="form-label">성별</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">선택하세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>

      <div className="form-row">
        <label className="form-label">나이</label>
        <select
          name="age"
          value={form.age}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">선택하세요</option>
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label className="form-label">키 (cm)</label>
        <select
          name="height"
          value={form.height}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">선택하세요</option>
          {Array.from({ length: 131 }, (_, i) => i + 100).map((num) => (
            <option key={num} value={num}>
              {num} cm
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label className="form-label">몸무게 (kg)</label>
        <select
          name="weight"
          value={form.weight}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">선택하세요</option>
          {Array.from({ length: 181 }, (_, i) => i + 20).map((num) => (
            <option key={num} value={num}>
              {num} kg
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default BasicInfoSection;
