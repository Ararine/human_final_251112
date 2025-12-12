import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recommendedMealLists } from "../../api/Meal";
// MealCard 컴포넌트
const MealCard = ({ meal }) => (
  <div className="border rounded-lg p-3 shadow-sm flex flex-col justify-between h-40">
    <div>
      <h4>{meal.음식명}</h4>
      <p>중량: {meal.중량_g} g</p>
    </div>

    {/* 링크 버튼 */}
    {meal.link ? (
      <a href={meal.link} target="_blank" rel="noopener noreferrer">
        상품 보기
      </a>
    ) : (
      <div />
    )}
  </div>
);

const Recommend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendedMeals = location.state?.recommendedMeals?.일자별_식단 || [];
  const nDays = location.state?.nDays || 2;
  const nTimes = location.state?.nTimes || 2;
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  if (recommendedMeals.length === 0) {
    return <div>추천 식단이 없습니다.</div>;
  }

  const selectedDay = recommendedMeals[selectedDayIdx];

  return (
    <div>
      <div>
        <h2>추천 식단</h2>
      </div>

      {/* 날짜 선택 버튼 */}
      <div>
        {recommendedMeals.map((day, idx) => (
          <button
            key={idx}
            className={` ${idx === selectedDayIdx ? "bg-darkgray" : ""}`}
            onClick={() => setSelectedDayIdx(idx)}
          >
            {day.날짜}
          </button>
        ))}
      </div>

      {/* 끼니별 스크롤 카드 */}
      <div className="flex-row gap-10">
        {selectedDay.끼니별_식단.map((mealArr, mealIdx) => (
          <div key={mealIdx} style={{ widih: "80%", minWidth: "60%" }}>
            <h3>끼니 {mealIdx + 1}</h3>

            {/* 가로 스크롤 영역 */}
            <div>
              {mealArr.map((meal, idx) => (
                <MealCard key={idx} meal={meal} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
