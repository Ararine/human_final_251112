const AccountSection = ({ form, onChange }) => {
  return (
    <section className="flex-column flex-center">
      <h3>계정 정보</h3>
      <div className="flex-column">
        <label>이메일</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
      </div>
      <div className="flex-column">
        <label>비밀번호</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
          required
        />
      </div>
    </section>
  );
};

export default AccountSection;
