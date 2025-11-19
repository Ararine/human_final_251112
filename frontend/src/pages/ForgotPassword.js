// src/pages/ForgotPassword.js
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 나중에 백엔드 연결할 자리
    // await api.post("/auth/forgot-password", { email });

    console.log("비밀번호 재설정 메일 요청:", email);
    setSent(true);
    alert("비밀번호 재설정 메일을 보냈다고 가정!(지금은 가짜)");
  };

  return (
    <div className="forgot-page">
      <h2>비밀번호 재설정</h2>

      <p>가입하신 이메일을 입력하시면, 비밀번호 재설정 링크를 보내드립니다.</p>

      <form onSubmit={handleSubmit} className="forgot-form">
        <div className="form-row">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          재설정 메일 보내기
        </button>
      </form>

      {sent && (
        <p className="info-text">
          (가짜 메시지) 메일이 발송되었다고 가정합니다. 실제 동작은 백엔드 연동
          후에 구현합니다.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
