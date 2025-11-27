import { useState, useEffect } from "react";
import Uploader from "../../components/Uploader";
import "../../css/meal.css";

const Meal = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    const urls = imgs.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  return (
    <div className="meal-grid">
      {/* 1. AI 분석 */}
      <div className="meal-card meal-ai">
        <div className="meal-icon">🍱</div>
        <h2>AI 식단 분석</h2>
        <h3>* 업로드시 식단인증 자동 등록 고려 *</h3>
        <div className="meal-center">
          <Uploader files={files} setFiles={setFiles} />
          {previews.length > 0 && (
            <div className="meal-preview-box">
              {previews.map((src, i) => (
                <img key={i} src={src} alt="preview" />
              ))}
            </div>
          )}
        </div>

        <button className="meal-btn">AI 분석하기</button>
      </div>

      {/* 2. 목적별 추천 */}
      <div className="meal-card meal-goal">
        <div className="meal-icon">🎯</div>
        <h2>목적별 식단 추천</h2>

        <div className="meal-goal-buttons">
          <button>체중 감량</button>
          <button>근력 증가</button>
          <button>균형/건강</button>
        </div>
      </div>

      {/* 3. 추천 식품 */}
      <div className="meal-card meal-food">
        <div className="meal-icon">🛒</div>
        <h2>추천 식품</h2>

        <div className="meal-tag-list">
          <span>닭가슴살</span>
          <span>현미밥</span>
          <span>단백질 쉐이크</span>
          <span>오트밀</span>
        </div>

        <button className="meal-btn small">식품 구매하러 가기 →</button>
      </div>

      {/* 4. 식단 인증 */}
      <div className="meal-card meal-auth">
        <div className="meal-icon">📷</div>
        <h2>식단 인증</h2>

        <Uploader files={files} setFiles={setFiles} />
        <button className="meal-btn small">식단 인증 등록</button>
      </div>
    </div>
  );
};

export default Meal;
