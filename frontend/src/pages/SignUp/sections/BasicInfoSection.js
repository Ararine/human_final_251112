const BasicInfoSection = ({ form, onChange }) => {
  return (
    <section className="flex-column flex-center">
      <h3>기본 정보</h3>

      <div className="flex-column">
        <label>이름</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={form.name ?? ""}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
      </div>

      <div className="flex-column" style={{ width: "100%" }}>
        <label>성별</label>
        <select
          className="form-input"
          name="gender"
          value={form.gender ?? ""}
          onChange={(e) => onChange("gender", e.target.value)}
          required
        >
          <option value="">선택하세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>
      <div className="flex-column">
        <label htmlFor="age">나이</label>
        <input
          type="number"
          id="age"
          name="age"
          min="1"
          max="100"
          value={form.age ?? ""}
          onChange={(e) => onChange("age", e.target.value)}
          className="form-input"
          placeholder="나이를 입력하세요"
          required
        />
      </div>

      <div className="flex-column">
        <label htmlFor="height">키 (cm)</label>
        <input
          type="number"
          id="height"
          name="height"
          min="100"
          max="230"
          value={form.height ?? ""}
          onChange={(e) => onChange("height", e.target.value)}
          className="form-input"
          placeholder="키를 입력하세요"
          required
        />
      </div>

      <div className="flex-column">
        <label htmlFor="weight">몸무게 (kg)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          min="20"
          max="200"
          value={form.weight ?? ""}
          onChange={(e) => onChange("weight", e.target.value)}
          className="form-input"
          placeholder="몸무게를 입력하세요"
          required
        />
      </div>
    </section>
  );
};

export default BasicInfoSection;
