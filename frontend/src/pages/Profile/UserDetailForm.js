/* 🔥 NEW VERSION with 3 extra fields added */

import React from "react";
import "../../css/profile.css";

const UserDetailForm = ({
  detail,
  handleDetailChange,
  toggleMulti,
  saveDetail,
}) => {
  return (
    <section className="profile-section">
      <h3 className="section-title">생활 · 운동 정보</h3>

      {/* 운동 목표 */}
      <div className="profile-field">
        <label>운동 목표</label>
        <select
          name="goal"
          value={detail.goal || ""}
          onChange={handleDetailChange}
        >
          <option value="">선택하세요</option>
          <option value="체중감량">체중감량</option>
          <option value="자세 교정">자세 교정</option>
          <option value="근력 향상">근력 향상</option>
          <option value="상태 유지">상태 유지</option>
        </select>
      </div>

      {/* 직업 */}
      <div className="profile-field">
        <label>직업 유형</label>
        <select
          name="job"
          value={detail.job || ""}
          onChange={handleDetailChange}
        >
          <option value="">선택하세요</option>
          <option value="사무직">사무직(앉아서 일함)</option>
          <option value="서비스/영업직">서비스·영업직</option>
          <option value="육체 노동">육체 노동</option>
          <option value="자영업">자영업</option>
          <option value="주부">주부</option>
          <option value="학생">학생</option>
        </select>
      </div>

      {/* 평균 활동량 */}
      <div className="profile-field">
        <label>평균 활동량</label>
        <select
          name="activity_level"
          value={detail.activity_level || ""}
          onChange={handleDetailChange}
        >
          <option value="">선택하세요</option>
          <option value="앉음">앉아서 지냄</option>
          <option value="서있음">서있는 시간이 많음</option>
          <option value="움직임 많음">움직임이 많은 편</option>
        </select>
      </div>

      {/* 🔥 평균 운동 시간 (추가됨) */}
      <div className="profile-field">
        <label>하루 평균 운동 시간 (분)</label>
        <input
          type="number"
          name="activity_duration"
          value={detail.activity_duration || ""}
          onChange={handleDetailChange}
          placeholder="예: 30 (분)"
          min="0"
          max="300"
        />
      </div>

      {/* 수면 시간 */}
      <div className="profile-field">
        <label>하루 평균 수면 시간 (시간)</label>
        <input
          type="number"
          name="sleep_duration"
          value={detail.sleep_duration || ""}
          onChange={handleDetailChange}
          placeholder="예: 7"
          min="0"
          max="24"
        />
      </div>

      {/* 활동 시간대 */}
      <div className="profile-field">
        <label>주로 활동하는 시간대</label>
        <select
          name="chronotype"
          value={detail.chronotype || ""}
          onChange={handleDetailChange}
        >
          <option value="">선택하세요</option>
          <option value="아침">아침</option>
          <option value="저녁">저녁</option>
          <option value="일정하지 않음">일정하지 않음</option>
        </select>
      </div>

      {/* 통증 부위 */}
      <div className="profile-field">
        <label>현재 통증 부위 (복수 선택)</label>
        <div className="multi-select">
          {["목", "어깨", "허리", "무릎", "손목", "발목", "없음"].map(
            (item) => (
              <button
                type="button"
                key={item}
                className={`multi-btn ${
                  detail.disease?.includes(item) ? "active" : ""
                }`}
                onClick={() => toggleMulti("disease", item)}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* 장비 보유 */}
      <div className="profile-field">
        <label>보유 장비 (복수 선택)</label>
        <div className="multi-select">
          {["맨몸", "밴드", "덤벨"].map((item) => (
            <button
              type="button"
              key={item}
              className={`multi-btn ${
                detail.equipment?.includes(item) ? "active" : ""
              }`}
              onClick={() => toggleMulti("equipment", item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 음식 제한 (추가됨) */}
      <div className="profile-field">
        <label>음식 제한</label>
        <input
          type="text"
          name="food_restrictions"
          value={detail.food_restrictions || ""}
          placeholder="예: 나트륨 제한, 단 음식 제한"
          onChange={handleDetailChange}
        />
      </div>

      {/* 🔥 하루 물 섭취량 (추가됨) */}
      <div className="profile-field">
        <label>하루 물 섭취량 (ml)</label>
        <input
          type="number"
          name="water_intake"
          value={detail.water_intake || ""}
          placeholder="예: 1500"
          onChange={handleDetailChange}
        />
      </div>

      {/* 저장 버튼 */}
      <button className="btn-primary" onClick={saveDetail}>
        저장하기
      </button>
    </section>
  );
};

export default UserDetailForm;
