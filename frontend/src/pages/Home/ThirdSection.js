import Footer from "../../components/Footer";

const ThirdSection = () => {
  return (
    <>
      <section className="sec-3">
        <div className="flex-row gap-10">
          {/* 5️⃣ 브랜드 신뢰 정보 */}
          <div className="card bg-midgray">
            <h2>믿을 수 있는 이유</h2>
            <ul>
              <li>10,000+ 사용자 분석 데이터 기반</li>
              <li>전문 트레이너 협업 알고리즘</li>
              <li>AI 자세 분석 기술 활용</li>
            </ul>
          </div>
          <div className="card bg-midgray">
            <h2>자주 묻는 질문</h2>
            <div>
              <div>Q. ROM 측정은 정확한가요?</div>
              <div>최신 AI 모델 기반 ±3~7° 오차입니다.</div>
            </div>

            <div className="faq-item">
              <div>Q. 사진은 저장되나요?</div>
              <div>분석 후 즉시 삭제되며 안전하게 처리됩니다.</div>
            </div>

            <div>
              <div>Q. 무료 기능도 있나요?</div>
              <div>기본 운동 기능은 무료로 제공됩니다.</div>
            </div>
          </div>
          {/* 1️⃣ 구독 혜택 */}
          <div className="card bg-midgray">
            <h2 className="section-title">Premium 혜택</h2>
            <ul className="premium-list">
              <li>AI 식단 분석 무제한</li>
              <li>맞춤 운동 루틴 자동 생성</li>
              <li>ROM 측정 보고서 제공</li>
              <li>운동·식단 기록 통계 제공</li>
              <li>커뮤니티 광고 제거</li>
              <li>전문가 QnA 우선 답변</li>
            </ul>
            <button className="premium-btn">지금 구독하고 시작하기 →</button>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Footer />
        </div>
      </section>
    </>
  );
};

export default ThirdSection;
