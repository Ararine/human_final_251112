// ==============================
// 🔥 기존 코드 (보존용)
// ==============================
/*
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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
          (가짜 메시지) 메일이 발송되었다고 가정합니다. 실제 동작은 백엔드 연동 후에 구현합니다.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
*/

// ==============================
// 🔥 수정된 실제 동작 코드
// ==============================
import { useState } from "react";
import { requestPasswordReset } from "../api/Auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 실제 백엔드 요청으로 변경됨
      await requestPasswordReset(email);

      setSent(true);
      alert("비밀번호 재설정 메일을 보냈습니다.");
    } catch (err) {
      console.error("비밀번호 재설정 오류:", err);
      alert("요청에 실패했습니다. 다시 시도해주세요.");
    }
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
          비밀번호 재설정 메일이 발송되었습니다. 메일함을 확인해 주세요.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
