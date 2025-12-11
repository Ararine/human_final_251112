// src/pages/Home/RomInfo.js
import React from "react";
import "./romInfo.css";

export default function RomInfo() {
  return (
    <section className="sec-rom">
      <div className="rom-inner">
        {/* 상단 타이틀 */}
        <div className="rom-head">
          <span className="rom-chip">ROM 소개</span>
          <h2 className="rom-title">ROM, 어렵지 않아요</h2>
          <p className="rom-sub">
            ROM은 내 몸이 편안하게 움직일 수 있는 범위예요.
            <br />
            중요한 건 숫자가 아니라, 그 범위 안에서 부드럽게 꾸준히 움직이는
            거예요.
          </p>
        </div>

        {/* 비주얼 : 라인 아트 무릎 ROM */}
        <div className="rom-visual">
          <svg
            className="rom-knee-svg"
            viewBox="0 0 200 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 배경 살짝 그라데이션 */}
            <defs>
              <radialGradient id="kneeGlow" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#fb7185" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 둥근 글로우 */}
            <circle
              cx="100"
              cy="80"
              r="70"
              fill="url(#kneeGlow)"
              opacity="0.9"
            />

            {/* ROM 각도 아크 (반원) */}
            <path
              className="rom-knee-arc"
              d="M 120 115 A 45 45 0 0 1 80 80"
              fill="none"
            />

            {/* 기준선 */}
            <line
              x1="120"
              y1="70"
              x2="120"
              y2="115"
              className="rom-knee-bone-base"
            />

            {/* 허벅지 (고정) */}
            <line x1="70" y1="70" x2="120" y2="70" className="rom-knee-bone" />

            {/* 무릎 관절 */}
            <circle cx="120" cy="70" r="10" className="rom-knee-joint" />

            {/* 종아리 : ROM 범위 안에서 살짝 움직이는 라인 */}
            <g className="rom-knee-indicator">
              <line
                x1="120"
                y1="70"
                x2="120"
                y2="115"
                className="rom-knee-bone"
              />
              <circle cx="120" cy="115" r="4" className="rom-knee-foot" />
            </g>
          </svg>

          <p className="rom-visual-caption">
            무릎 관절이 편안하게 움직일 수 있는 각도의 범위를 ROM이라고 불러요.
          </p>
        </div>

        {/* 메인 설명 + 카드들 */}
        <div className="rom-body">
          {/* 메인 설명 카드 */}
          <div className="rom-main-card">
            <h3 className="rom-main-title">ROM, 내 몸이 허락하는 선</h3>
            <p className="rom-main-text">
              관절이 부담 없이 움직일 수 있는 시작점과 끝점 사이.
              <br />
              사람마다 다르고, 오늘 컨디션에 따라 달라지는 나만의 범위예요.
            </p>
          </div>

          {/* 3개의 핵심 포인트 카드 */}
          <div className="rom-grid">
            <div className="rom-card">
              <div className="rom-card-header">
                <span className="rom-card-icon">👤</span>
                <h4>사람마다 다른 나만의 ROM</h4>
              </div>
              <p>
                나이, 체형, 유연성, 부상 경험에 따라 각자의 ROM은 전혀 다르게
                나타나요.
              </p>
            </div>

            <div className="rom-card">
              <div className="rom-card-header">
                <span className="rom-card-icon">🌡️</span>
                <h4>컨디션에 따라 매일 변화</h4>
              </div>
              <p>
                피곤하거나 뻐근한 날엔 ROM이 줄고, 가벼운 날엔 더 넓게 움직일 수
                있어요.
              </p>
            </div>

            <div className="rom-card">
              <div className="rom-card-header">
                <span className="rom-card-icon">🤖</span>
                <h4>HomeFit은 ROM 안에서 설계</h4>
              </div>
              <p>
                정답 자세 대신, 지금 내 ROM 안에서 안전하게 움직일 수 있는
                동작만 조합해 루틴을 만들어요.
              </p>
            </div>
          </div>
        </div>

        {/* 브랜드 메시지 */}
        <div className="rom-cta">
          <span className="rom-cta-text">
            “더 많이”가 아니라,
            <strong> 내 몸에 맞게, 오래 운동하는 것.</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
