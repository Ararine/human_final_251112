import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceCheckPage from "./AttendanceCheckPage";

export default function Home({ userInfo }) {
  const images = ["/3.jpg", "/4.jpg", "/5.jpg"];
  const [current, setCurrent] = useState(0);
  const [showAttendance, setShowAttendance] = useState(false);
  const navigate = useNavigate();

  // 🔄 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 🔥 로그인 + 출석 체크 통합 실행 함수
  const handleStart = () => {
    // 1) 로그인 여부 체크
    if (!userInfo) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    // 2) 오늘 출석 모달을 본 적 있는지 확인
    const today = new Date().toISOString().split("T")[0];
    const visited = localStorage.getItem("attendanceCheckedDate");

    // 3) 이미 봤으면 → 운동 페이지로 이동
    if (visited === today) {
      navigate("/exercise");
      return;
    }

    // 4) 처음이면 → 출석 모달 띄우기
    setShowAttendance(true);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="home-container">
      <section>
        {/* 🔥 히어로 배너 */}
        <div className="hero-section">
          <img
            src={images[current]}
            key={current}
            alt="banner"
            className="hero-image fade"
          />

          <div className="hero-center-box">
            <button className="start-btn" onClick={handleStart}>
              바로 시작하기
            </button>
          </div>

          <button className="arrow left" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="arrow right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
        {/* 기존 섹션들 유지 */}
        <div className="hero-text-box">
          <h1 className="hero-title">당신만을 위한 최적의 운동 루틴</h1>
          <p className="hero-desc">
            운동 추천부터 식단 분석, ROM까지—홈트의 모든 것을 한곳에서.
          </p>
        </div>
      </section>

      <section>
        <div className="feature-card" onClick={() => navigate("/exercise")}>
          <div className="card-image"></div>
          <h2 className="card-title">운동</h2>
          <p className="card-desc">개인 맞춤 홈트레이닝 루틴 제공</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/meal")}>
          <div className="card-image"></div>
          <h2 className="card-title">식단</h2>
          <p className="card-desc">AI 분석 기반 식단 추천</p>
        </div>

        <div className="feature-card" onClick={() => navigate("/rom")}>
          <div className="card-image"></div>
          <h2 className="card-title">ROM</h2>
          <p className="card-desc">카메라 기반 관절 가동 범위 측정</p>
        </div>
      </section>

      {/* 1️⃣ 구독 혜택 */}
      <section className="premium-section">
        <h2 className="section-title">HomeFit Premium 혜택</h2>

        <ul className="premium-list">
          <li>AI 식단 분석 무제한</li>
          <li>맞춤 운동 루틴 자동 생성</li>
          <li>ROM 측정 보고서 제공</li>
          <li>운동·식단 기록 통계 제공</li>
          <li>커뮤니티 광고 제거</li>
          <li>전문가 QnA 우선 답변</li>
        </ul>

        <button className="premium-btn">지금 구독하고 시작하기 →</button>
      </section>

      {/* 2️⃣ How It Works */}
      <section className="how-section">
        <h2 className="section-title">HomeFit은 이렇게 사용해요</h2>

        <div className="how-grid">
          <div className="how-card">1. 회원가입</div>
          <div className="how-card">2. 목표 설정</div>
          <div className="how-card">3. AI 운동 추천</div>
          <div className="how-card">4. 식단 분석</div>
          <div className="how-card">5. ROM 측정</div>
          <div className="how-card">6. 통계 확인</div>
        </div>
      </section>

      {/* 3️⃣ 성공 사례 */}
      <section className="success-section">
        <h2 className="section-title">실제 사용자 변화</h2>

        <div className="success-grid">
          <div className="success-card">
            <h3>-4.2kg 감량</h3>
            <p>식단 분석 + 운동 루틴으로 한달 변화</p>
          </div>

          <div className="success-card">
            <h3>ROM +18° 증가</h3>
            <p>관절 가동 범위 꾸준히 향상</p>
          </div>

          <div className="success-card">
            <h3>자세 교정 성공</h3>
            <p>AI 분석으로 무릎 흔들림 개선</p>
          </div>
        </div>
      </section>

      {/* 4️⃣ FAQ */}
      <section className="faq-section">
        <h2 className="section-title">자주 묻는 질문</h2>

        <div className="faq-item">
          <div className="faq-q">Q. ROM 측정은 정확한가요?</div>
          <div className="faq-a">최신 AI 모델 기반 ±3~7° 오차입니다.</div>
        </div>

        <div className="faq-item">
          <div className="faq-q">Q. 사진은 저장되나요?</div>
          <div className="faq-a">
            분석 후 즉시 삭제되며 안전하게 처리됩니다.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">Q. 무료 기능도 있나요?</div>
          <div className="faq-a">기본 운동 기능은 무료로 제공됩니다.</div>
        </div>
      </section>

      {/* 5️⃣ 브랜드 신뢰 정보 */}
      <section className="trust-section">
        <h2 className="section-title">HomeFit을 믿을 수 있는 이유</h2>

        <ul className="trust-list">
          <li>10,000+ 사용자 분석 데이터 기반</li>
          <li>전문 트레이너 협업 알고리즘</li>
          <li>AI 자세 분석 기술 활용</li>
        </ul>
      </section>

      {/* 🔥 출석 모달 */}
      {showAttendance && (
        <AttendanceCheckPage
          userInfo={userInfo}
          onClose={() => setShowAttendance(false)}
        />
      )}
    </div>
  );
}
