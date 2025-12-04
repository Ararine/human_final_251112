const SecondSection = ({ navigate }) => {
  return (
    <>
      <section className="sec-2">
        <div className="flex-column flex-center gap-40">
          <div className="flex-row gap-20">
            <div
              className="card flex-center bg-midgray"
              onClick={() => navigate("/exercise")}
            >
              <div>
                <h2>운동</h2>
                <p>개인 맞춤 홈트레이닝 루틴 제공</p>
              </div>
            </div>

            <div
              className="card flex-center bg-midgray"
              onClick={() => navigate("/meal")}
            >
              <div>
                <h2>식단</h2>
                <p>AI 분석 기반 식단 추천</p>
              </div>
            </div>

            <div
              className="card flex-center bg-midgray"
              onClick={() => navigate("/rom")}
            >
              <div>
                <h2>ROM</h2>
                <p>카메라 기반 관절 가동 범위 측정</p>
              </div>
            </div>
          </div>

          {/* 2️⃣ How It Works */}
          <div className="flex-row gap-20">
            <div className="flex-column card gap-10  bg-midgray use-card">
              <h2 className="section-title">HomeFit은 이렇게 사용해요</h2>
              <div className="card">1. 회원가입</div>
              <div className="card">2. 목표 설정</div>
              <div className="card">3. AI 운동 추천</div>
              <div className="card">4. 식단 분석</div>
              <div className="card">5. ROM 측정</div>
              <div className="card">6. 통계 확인</div>
            </div>
            {/* 3️⃣ 성공 사례 */}
            <div
              className="flex-column gap-5"
              style={{ justifyContent: "center" }}
            >
              <h2 className="section-title">실제 사용자 변화</h2>

              <div className="card zero-margin  bg-midgray">
                <h3>-4.2kg 감량</h3>
                <p>식단 분석 + 운동 루틴으로 한달 변화</p>
              </div>

              <div className="card zero-margin  bg-midgray">
                <h3>ROM +18° 증가</h3>
                <p>관절 가동 범위 꾸준히 향상</p>
              </div>

              <div className="card zero-margin  bg-midgray">
                <h3>자세 교정 성공</h3>
                <p>AI 분석으로 무릎 흔들림 개선</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondSection;
