const AccountSection = ({ form, onChange }) => {
  return (
    <section className="signup-section">
      <h3 className="section-title">계정 정보</h3>

      <div className="form-row">
        <label className="form-label">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <label className="form-label">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
          className="form-input"
          required
        />
      </div>
    </section>
  );
};

export default AccountSection;
