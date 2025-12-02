import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동용
import Uploader from "../../components/Uploader";
import {
  getCalories,
  recommendedMealLists,
  uploadMealAuth,
} from "../../api/Meal";

const Meal = () => {
  const navigate = useNavigate();

  // AI 분석 전용 스테이트
  const [aiFiles, setAiFiles] = useState([]);
  const [aiPreviews, setAiPreviews] = useState([]);
  const [aiResult, setAiResult] = useState(null);

  // 식단 인증 전용 스테이트
  const [authFiles, setAuthFiles] = useState([]);
  const [authPreviews, setAuthPreviews] = useState([]);

  // 목적별 추천 입력값
  const [nDays, setNDays] = useState(3);
  const [nTimes, setNTimes] = useState(3);

  // AI 분석 이미지 프리뷰
  useEffect(() => {
    const imgs = aiFiles.filter((f) => f.type.startsWith("image/"));
    const urls = imgs.map((f) => URL.createObjectURL(f));
    setAiPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [aiFiles]);

  // 식단 인증 이미지 프리뷰
  useEffect(() => {
    const imgs = authFiles.filter((f) => f.type.startsWith("image/"));
    const urls = imgs.map((f) => URL.createObjectURL(f));
    setAuthPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [authFiles]);

  // AI 분석 핸들러
  const handleCalories = async () => {
    if (aiFiles.length === 0) return alert("파일을 업로드해주세요.");
    try {
      const file = aiFiles[0];
      const response = await getCalories(file);
      setAiResult(response);

      const food = response.data[0];
      if (food !== undefined) {
        const resultStr = `
          식품명: ${food["음 식 명"]}
          중량(g): ${food["중량(g)"]}
          에너지(kcal): ${food["에너지(kcal)"]}
          탄수화물(g): ${food["탄수화물(g)"]}
          단백질(g): ${food["단백질(g)"]}
          지방(g): ${food["지방(g)"]}
          당류(g): ${food["당류(g)"]}
          나트륨(mg): ${food["나트륨(mg)"]}
          칼슘(mg): ${food["칼슘(mg)"]}
          철(mg): ${food["철(mg)"]}
          칼륨(mg): ${food["칼륨(mg)"]}
          마그네슘(mg): ${food["마그네슘(mg)"]}
          아연(mg): ${food["아연(mg)"]}
          콜레스테롤(mg): ${food["콜레스테롤(mg)"]}
          트랜스지방(g): ${food["트랜스지방(g)"]}
        `;
        alert(resultStr);
      } else {
        alert("사진에서 음식 찾기 및 칼로리 추정에 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("AI 분석 실패!");
    }
  };

  const handleAuthUpload = async () => {
    if (authFiles.length === 0) return alert("파일을 선택해주세요.");
    try {
      const file = authFiles[0];
      const response = await uploadMealAuth(file);
      console.log(response);
      alert("식단 인증 등록 완료!");
    } catch (err) {
      console.error(err);
      alert("식단 인증 등록 실패!");
    }
  };

  // 메인 카드 식단 인증 등록 핸들러
  const handleMainAuthUpload = async () => {
    try {
      // 추천 식단 가져오기
      const response = await recommendedMealLists(nDays, nTimes);
      console.log(response);

      // 완료 후 다른 페이지 이동 (예: /meal/recommend)
      navigate("/meal/recommend", {
        state: { recommendedMeals: response.results, nDays, nTimes },
      });
    } catch (err) {
      console.error(err);
      alert("식단 인증 등록 또는 추천 식단 불러오기 실패!");
    }
  };

  return (
    <div className="meal-grid">
      {/* 2. AI 분석 */}
      <div className="meal-card meal-ai">
        <div className="meal-icon">🍱</div>
        <h2>AI 식단 분석</h2>
        <h3>* 업로드시 식단인증 자동 등록 고려 *</h3>
        <div className="meal-center">
          <Uploader
            files={aiFiles}
            setFiles={setAiFiles}
            handleUpload={handleCalories}
            upload_button_name="AI 분석하기"
          />
        </div>
      </div>

      {/* 3. 식단 인증 */}
      <div className="meal-card meal-auth">
        <div className="meal-icon">📷</div>
        <h2>식단 인증</h2>
        <Uploader
          files={authFiles}
          setFiles={setAuthFiles}
          handleUpload={handleAuthUpload}
          upload_button_name="식단 인증 등록"
        />
      </div>

      {/* 1. 목적별 추천 (메인) */}
      <div
        className="meal-card meal-goal main-card"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div className="meal-icon">🎯</div>
        <h2>목적별 식단 추천</h2>

        {/* 일수, 끼니 수 입력 */}
        <div className="meal-goal-inputs">
          <label>
            일수:
            <input
              type="number"
              min={1}
              value={nDays}
              onChange={(e) => setNDays(Number(e.target.value))}
            />
          </label>
          <label>
            하루 끼니 수:
            <input
              type="number"
              min={1}
              value={nTimes}
              onChange={(e) => setNTimes(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="meal-goal-buttons">
          <button>체중 감량</button>
          <button>근력 증가</button>
          <button>균형/건강</button>
        </div>
        <button className="meal-btn small" onClick={handleMainAuthUpload}>
          식단 인증 등록
        </button>
      </div>
    </div>
  );
};

export default Meal;
