// src/pages/SignUp/index.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/url";
import SignUpForm from "./SignUpForm";

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

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 제출 (회원가입 버튼)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    console.log("회원가입 데이터:", form);
    alert("회원가입 완료(가정). 로그인 페이지로 이동합니다.");

    navigate(URL.LOGIN_URL);
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>

      <SignUpForm
        form={form}
        handleChange={handleChange}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SignUp;
