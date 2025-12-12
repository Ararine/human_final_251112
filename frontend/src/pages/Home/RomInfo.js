// src/pages/Home/RomInfo.js
import React from "react";
import "../../css/romInfo.css";

export default function RomInfo() {
  return (
    <section className="sec-rom">
      <div className="rom-inner">
        {/* 상단 타이틀 */}
        <div className="rom-head">
          <span className="rom-chip">ROM 소개</span>
          <h2 className="rom-title">ROM, 어렵지 않아요</h2>
        </div>

        {/* 비주얼 : 아이콘 이미지 */}
        <div className="rom-visual" aria-hidden="true">
          {/* halo(빛 번짐) */}
          <span className="rom-visual-halo" />

          {/* 아이콘 */}
          <img
            src="/accessibility.svg"
            alt="ROM 안내 아이콘"
            className="rom-visual-img"
            draggable="false"
          />
        </div>

        {/* 메인 설명 */}
        <div className="rom-main-card">
          <h3 className="rom-main-title">ROM, 내 몸이 허락하는 선</h3>
          <p className="rom-main-text">
            ROM은 관절이 편안하게 움직일 수 있는 범위를 뜻해요.
            <br />이 범위를 지키면 몸에 무리를 줄이고 부상을 예방할 수 있어요.
          </p>
        </div>

        {/* 3개의 핵심 포인트 카드 */}
        <div className="rom-grid">
          <div className="rom-card">
            <div className="rom-card-header">
              <h4>👤사람마다 다른 나만의 ROM</h4>
            </div>
            <p>
              나이, 체형, 유연성, 부상 경험에 따라 각자의 ROM은 전혀 다르게
              나타나요.
            </p>
          </div>

          <div className="rom-card">
            <div className="rom-card-header">
              <h4>🌡️컨디션에 따라 매일 변화</h4>
            </div>
            <p>
              피곤하거나 뻐근한 날엔 ROM이 줄고, 가벼운 날엔 더 넓게 움직일 수
              있어요.
            </p>
          </div>

          <div className="rom-card">
            <div className="rom-card-header">
              <h4>🤖HomeFit은 ROM 안에서 설계</h4>
            </div>
            <p>
              정답 자세 대신, 지금 내 ROM 안에서 안전하게 움직일 수 있는 동작만
              조합해 루틴을 만들어요.
            </p>
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
