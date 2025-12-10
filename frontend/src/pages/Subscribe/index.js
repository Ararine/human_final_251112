import "../../css/subscribe.css";

const Subscribe = () => {
  return (
    <div className="subscribe-page">
      <h2 className="subscribe-title">구독 플랜</h2>

      <div className="plan-container">
        {/* Basic Plan */}
        <div className="plan-card">
          <h3>Basic</h3>
          <p>₩5,900 / 월</p>
          <ul>
            <li>운동 프로그램 제공</li>
            <li>식단 추천</li>
            <li>BMI 자동 계산</li>
          </ul>
          <button className="subscribe-btn">구독하기</button>
        </div>

        {/* Premium Plan */}
        <div className="plan-card premium">
          <h3>Premium</h3>
          <p>₩9,900 / 월</p>
          <ul>
            <li>ROM 측정 기능</li>
            <li>AI 운동 분석</li>
            <li>개인 맞춤형 운동/식단 플랜</li>
            <li>커뮤니티 우선 지원</li>
          </ul>
          <button className="subscribe-btn premium-btn">프리미엄 구독</button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
