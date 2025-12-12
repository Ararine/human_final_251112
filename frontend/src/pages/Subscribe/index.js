import { useState } from "react";
import "../../css/subscribe.css";
import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    badge: "",
    priceMonthly: 5900,
    priceYearly: 5900 * 10,
    features: ["운동 프로그램 제공", "식단 추천", "BMI 자동 계산"],
    tone: "basic",
    cta: "구독하기",
  },
  {
    id: "premium",
    name: "Premium",
    badge: "추천",
    priceMonthly: 9900,
    priceYearly: 9900 * 10,
    features: [
      "ROM 측정 기능",
      "AI 운동 분석",
      "개인 맞춤형 운동/식단 플랜",
      "커뮤니티 우선 지원",
    ],
    tone: "premium",
    cta: "구독하기",
  },
];

const formatKRW = (n) => "₩" + n.toLocaleString("ko-KR");

function PlanCard({ plan, billing, selected, onSelect, onSubscribe }) {
  const price = billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
  const suffix = billing === "monthly" ? "/ 월" : "/ 년";

  return (
    <button
      type="button"
      className={`plan-card ${plan.tone} ${selected ? "selected" : ""}`}
      onClick={() => onSelect(plan.id)}
    >
      <div className="plan-inner">
        <div className="plan-top">
          <div className="plan-name">
            <h3>{plan.name}</h3>

            {/* 배지 슬롯 유지 */}
            <span
              className={`plan-badge ${plan.badge ? "" : "ghost"}`}
              aria-hidden={!plan.badge}
            >
              {plan.badge}
            </span>
          </div>

          <div className="plan-price">
            <span className="price">{formatKRW(price)}</span>
            <span className="suffix">{suffix}</span>
          </div>

          {billing === "yearly" ? (
            <p className="plan-hint">연간 결제 시 할인 적용</p>
          ) : (
            <p className="plan-hint">언제든지 해지 가능</p>
          )}
        </div>

        <ul className="plan-features">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {/* ✅ 여기서만 이동 트리거 */}
        <div className="plan-cta">
          <button
            type="button"
            className={`subscribe-btn ${plan.tone}`}
            onClick={(e) => {
              e.stopPropagation(); // 카드 선택 클릭과 분리
              onSelect(plan.id); // 해당 플랜 선택(테두리 유지)
              onSubscribe(plan.id); // 관리 페이지로 이동
            }}
          >
            {plan.cta}
          </button>
        </div>
      </div>
    </button>
  );
}

export default function Subscribe() {
  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    navigate("/subscribe/manage", {
      state: { selectedPlan: planId, billing },
    });
  };

  return (
    <div className="subscribe-page">
      <div className="subscribe-hero">
        <h2 className="subscribe-title">구독 플랜</h2>
        <p className="subscribe-desc">
          내 몸에 맞는 운동 루틴을 더 꾸준히. 필요할 때 업그레이드하고, 원하면
          언제든 해지하세요.
        </p>

        <div
          className="billing-toggle"
          role="tablist"
          aria-label="billing toggle"
        >
          <button
            className={`toggle-btn ${billing === "monthly" ? "on" : ""}`}
            onClick={() => setBilling("monthly")}
            type="button"
          >
            월간
          </button>
          <button
            className={`toggle-btn ${billing === "yearly" ? "on" : ""}`}
            onClick={() => setBilling("yearly")}
            type="button"
          >
            연간 (할인)
          </button>
        </div>
      </div>

      <div className="plan-container">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            selected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </div>
  );
}
