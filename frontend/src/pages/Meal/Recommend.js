import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recommendedMealLists } from "../../api/Meal";

const Recommend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendedMeals = location.state?.recommendedMeals?.일자별_식단 || [];
  const nDays = location.state?.nDays || 2;
  const nTimes = location.state?.nTimes || 2;
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  if (recommendedMeals.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        추천 식단이 없습니다.
      </div>
    );
  }

  const selectedDay = recommendedMeals[selectedDayIdx];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-1">추천 식단</h2>
      </div>

      {/* 날짜 선택 버튼 */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {recommendedMeals.map((day, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              idx === selectedDayIdx
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedDayIdx(idx)}
          >
            {day.날짜}
          </button>
        ))}
      </div>

      {/* 끼니별 스크롤 카드 */}
      <div className="overflow-x-auto flex gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
        {selectedDay.끼니별_식단.map((mealArr, mealIdx) => (
          <div
            key={mealIdx}
            className="snap-start w-[80vw] sm:w-[50vw] md:w-[33vw] flex flex-col gap-4 border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">끼니 {mealIdx + 1}</h3>

            {mealArr.map((meal, idx) => (
              <MealCard key={idx} meal={meal} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// MealCard 컴포넌트
const MealCard = ({ meal }) => (
  <div className="border rounded-lg p-3 shadow-sm flex flex-col justify-between h-40">
    <div>
      <h4 className="font-semibold text-lg mb-1">{meal.음식명}</h4>
      <p className="text-gray-600 mb-1">중량: {meal.중량_g} g</p>
    </div>

    {/* 링크 버튼 */}
    {meal.link ? (
      <a
        href={meal.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        상품 보기
      </a>
    ) : (
      <div className="h-10 mt-2" />
    )}
  </div>
);

export default Recommend;
