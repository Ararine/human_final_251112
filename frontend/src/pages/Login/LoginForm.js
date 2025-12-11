import React from "react";

const LoginForm = ({ form, handleChange, handleLogin }) => {
  return (
    <form onSubmit={handleLogin} className="flex-column gap-5">
      <div className="flex-column">
        <label>이메일</label>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="flex-column">
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <button type="submit" className="btn-primary login-button">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
