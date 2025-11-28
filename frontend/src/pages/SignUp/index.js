import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/url";

import AccountSection from "./sections/AccountSection";
import BasicInfoSection from "./sections/BasicInfoSection";
import TermsSection from "./sections/TermsSection";

import { signupRequest } from "../../api/Auth";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  // 입력 핸들러
  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    try {
      console.log("회원가입 요청 데이터:", form);

      // 🔥 숫자 타입 변환 필수 (422 방지)
      const result = await signupRequest({
        email: form.email,
        password: form.password,
        gender: form.gender,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
      });

      console.log("회원가입 응답:", result);

      alert("회원가입이 완료되었습니다!");
      navigate(URL.LOGIN_URL);
    } catch (error) {
      console.error("회원가입 실패:", error);

      const status = error?.response?.status;

      if (status === 400) {
        alert("회원가입 실패: 이미 존재하는 이메일일 수 있습니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>

      <AccountSection form={form} onChange={handleChange} />
      <BasicInfoSection form={form} onChange={handleChange} />
      <TermsSection agreeTerms={agreeTerms} setAgreeTerms={setAgreeTerms} />

      <button className="signup-btn" onClick={handleSubmit}>
        가입하기
      </button>
    </div>
  );
};

export default SignUp;
