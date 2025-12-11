import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동용
import Uploader from "../../components/Uploader";
import {
  deleteRecommendedMealLists,
  getCalories,
  getRecommendedMealLists,
  recommendedMealLists,
  uploadMealAuth,
} from "../../api/Meal";
import { getUserDetailInfoByUserId } from "../../api/UserDetail";
import CONST_URL from "../../constants/url";
const Meal = ({ userInfo }) => {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.type === "normal") {
      alert("구독자만 사용할 수 있는 기능입니다.");
      navigate("/subscribe"); // 이동할 경로
    }
  }, [userInfo, navigate]);

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
    console.log(imgs);
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

  const handleDelete = async () => {
    try {
      await deleteRecommendedMealLists();
      alert("식단 추천 목록이 삭제되었습니다.");
    } catch (err) {
      console.error("식단 추천 목록이 삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const fetchRecommendedMealLists = async () => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지
    setLoading(true);
    try {
      const res = await getRecommendedMealLists();
      let recommendedData = res?.results;

      // 객체가 들어올 수도 있으니 항상 배열로 변환
      const dataArray = recommendedData
        ? Array.isArray(recommendedData)
          ? recommendedData
          : [recommendedData]
        : [];
      if (dataArray.length > 0) {
        recommendedData = dataArray[0];
        console.log(recommendedData);
        // 알림창 띄우기
        const goToRecommend = window.confirm(
          "기본 식단 목록이 있습니다. 다시 추천 받으시겠습니까? \n취소를 누르고 삭제하시겠습니까?"
        );

        if (goToRecommend) {
          navigate(`${CONST_URL.MEAL_URL}/recommend`, {
            state: { recommendedMeals: recommendedData, nDays, nTimes },
          });
        } else {
          handleDelete();
        }
      } else {
        try {
          // 추천 식단 가져오기
          const response = await recommendedMealLists(nDays, nTimes);
          console.log(response);

          navigate(`${CONST_URL.MEAL_URL}/recommend`, {
            state: { recommendedMeals: response.results, nDays, nTimes },
          });
        } catch (err) {
          console.error(err);
          alert("식단 인증 등록 또는 추천 식단 불러오기 실패!");
        }
      }
    } catch (err) {
      console.error("추천 커리큘럼 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchRecommendedMealLists();
  // }, []);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getUserDetailInfoByUserId();
        const data = res.data;
      } catch (err) {
        if (err.response.status == 401) {
          alert("로그인이 필요한 서비스입니다.");
          navigate(`${CONST_URL.LOGIN_URL}`);
        }
        console.error("유저 상세 정보 불러오기 실패:", err);
      }
    };

    fetchUserDetail();
  }, []);

  return (
    <div className="meal-grid">
      {/* 1. AI 분석 */}
      <div className="card bg-midgray gap-10">
        <div className="meal-icon">🍱</div>
        <h2>AI 식단 분석</h2>
        <p>* 업로드시 식단인증 자동 등록 고려 *</p>
        <div className="upload-container flex-column flex-center ">
          <Uploader
            files={aiFiles}
            setFiles={setAiFiles}
            handleUpload={handleCalories}
            upload_button_name="AI 분석하기"
          />
        </div>
      </div>

      {/* 2. 식단 인증 */}
      <div className="card bg-midgray">
        <div className="meal-icon">📷</div>
        <h2>식단 인증</h2>
        <p>구현필요</p>
        <div className="upload-container flex-column flex-center">
          <Uploader
            files={authFiles}
            setFiles={setAuthFiles}
            handleUpload={handleAuthUpload}
            upload_button_name="식단 인증 등록"
          />
        </div>
      </div>

      {/* 3. 목적별 추천 (메인) */}
      <div
        className="card bg-midgray"
        style={{
          gap: "10px",
        }}
      >
        <div className="meal-icon">🎯</div>
        <h2>목적별 식단 추천</h2>

        {/* 일수, 끼니 수 입력 */}
        <div className="flex-row gap-20">
          <label>
            추천 일수:
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

        <div className="meal-goal-buttons flex-row gap-5">
          <button className="bg-lightgray btn-ghost">체중 감량</button>
          <button className="bg-lightgray btn-ghost">근력 증가</button>
          <button className="bg-lightgray btn-ghost">균형/건강</button>
        </div>
        <button
          className="bg-blue btn-ghost"
          onClick={fetchRecommendedMealLists}
          disabled={loading} // 로딩 중이면 클릭 방지
        >
          {loading ? "로딩 중..." : "식단 인증 등록"}
        </button>
      </div>
    </div>
  );
};

export default Meal;
