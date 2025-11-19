// src/pages/SignUp.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { api } from "../api/axios";   // ⬅️ 백엔드 연결 시 다시 살릴 예정
import URL from "../constants/url";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    // ===============================
    // ① 현재: 백엔드 없이 프론트만 테스트
    // ===============================
    console.log("회원가입 폼 데이터(가짜로 출력만):", form);
    alert(
      "백엔드 없이 회원가입이 완료되었다고 가정하고\n로그인 페이지로 이동합니다."
    );
    navigate(URL.LOGIN_URL);

    // ==========================================
    // ② 백엔드 연결후 주석풀기
    // ==========================================
    /*
    try {
      const payload = {
        email: form.email,
        password: form.password,
        name: form.name,
        gender: form.gender,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
      };

      await api.post("/auth/signup", payload);

      alert("회원가입이 완료되었습니다!");
      navigate(URL.LOGIN_URL);
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
    */
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 1. 계정 정보 영역 */}
        <section className="signup-section">
          <h3 className="section-title">계정 정보</h3>
          <div className="form-row">
            <label className="form-label">이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
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
              onChange={handleChange}
              placeholder="8자 이상 입력"
              className="form-input"
              required
            />
          </div>
        </section>

        {/* 2. 기본 정보 영역 */}
        <section className="signup-section">
          <h3 className="section-title">기본 정보</h3>
          <div className="form-row">
            <label className="form-label">이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="예: 홍길동"
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
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="예: 25"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">키 (cm)</label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="예: 165"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">몸무게 (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="예: 55"
              className="form-input"
              required
            />
          </div>
        </section>

        {/* 3. 약관 동의 영역 */}
        <section className="signup-section">
          <h3 className="section-title">약관 동의</h3>
          <div className="form-row checkbox-row">
            <input
              id="agreeTerms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="agreeTerms">
              [필수] 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.
            </label>
          </div>
        </section>

        <div className="signup-actions">
          <button type="submit" className="btn-primary">
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
