import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomVideo from "./RandomVideo";
import {
  recommendedCurriculum,
  getRecommendedCurriculum,
  deleteRecommendedCurriculum,
} from "../../api/exercise";
import URL from "../../constants/url";
import {
  createUserDetailInfo,
  getUserDetailInfoByUserId,
} from "../../api/UserDetail";
import UserDetailInfo from "../Profile/UserDetailInfo";
export default function Exercise() {
  const navigate = useNavigate();

  // 선택값
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState({
    goal: "",
    job: "",
    activity_level: "",
    activity_duration: "",
    sleep_duration: "",
    chronotype: "",
    disease: [],
    equipment: [],
    food_restrictions: "",
    water_intake: "",
  });

  // 5분 ~ 180분까지 10분 간격 리스트 생성
  const timeOptions = [];
  for (let t = 5; t <= 180; t += 10) {
    timeOptions.push(t);
  }

  // 예시 운동 리스트
  const exercises = [
    {
      name: "스트레칭_상체",
      video: "http://localhost/data/스트레칭_상체.mp4",
    },
    { name: "스트레칭_하체", video: "http://localhost/data/스트레칭_하체.mp4" },
    {
      name: "스트레칭_하체",
      video: "http://localhost/data/스트레칭_하체2.mp4",
    },
  ];

  const createCurriculum = async () => {
    try {
      let res = await recommendedCurriculum(days, time);
      let recommendedData = res?.results;
      if (recommendedData) {
        // 객체가 들어올 수도 있으니 항상 배열로 변환
        const dataArray = recommendedData
          ? Array.isArray(recommendedData)
            ? recommendedData
            : [recommendedData]
          : [];
        if (dataArray.length > 0) {
          recommendedData = dataArray[0];
        }
      }
      return recommendedData;
    } catch {
      alert("신규 커리큘럼 생성에 실패하였습니다.");
    }
  };

  const getCurriculum = async () => {
    try {
      let res = await getRecommendedCurriculum();
      let recommendedData = res?.results;
      if (recommendedData) {
        // 객체가 들어올 수도 있으니 항상 배열로 변환
        const dataArray = recommendedData
          ? Array.isArray(recommendedData)
            ? recommendedData
            : [recommendedData]
          : [];
        if (dataArray.length > 0) {
          recommendedData = dataArray[0];
        }
      }
      return recommendedData;
    } catch (err) {
      alert("기존 커리큘럼 조회에 실패하였습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecommendedCurriculum();
      alert("기본 커리큘럼이 삭제되었습니다.");
    } catch (err) {
      console.error("기본 커리큘럼 삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    } finally {
    }
  };
  const handleGenerate = async (e) => {
    setLoading(true);
    try {
      const recommendedData = await getCurriculum();
      console.log(recommendedData);
      if (recommendedData) {
        // 기존 추천 존재
        const goToRecommend = window.confirm(
          "기본 커리큘럼이 있습니다. 기존 추천 페이지로 이동하시겠습니까?"
        );
        if (goToRecommend) {
          navigate(`${URL.EXERCISE_URL}/recommend`, {
            state: { recommendedData },
          });
        } else {
          // 기존 추천을 원하지 않음.
          const goToRecommend = window.confirm(
            "기존 커리큘럼을 삭제하시고 새로 추천 받으시겠습니까?"
          );
          if (goToRecommend) {
            if (!days || !time) {
              alert("추천 받을 일수와 하루 운동 시간을 입력해주세요.");
              return;
            }
            await handleDelete();
            const recommendedData = await createCurriculum();
            navigate(`${URL.EXERCISE_URL}/recommend`, {
              state: { recommendedData },
            });
          }
        }
      } else {
        // 기존 추천 미존재
        if (!days || !time) {
          alert("추천 받을 일수와 하루 운동 시간을 입력해주세요.");
          return;
        }
        const recommendedData = await createCurriculum();
        navigate(`${URL.EXERCISE_URL}/recommend`, {
          state: { recommendedData },
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getUserDetailInfoByUserId();
        const data = res.data;
        if (data.length == 0) {
          alert("사용자 상세 정보를 기입하여야 사용할 수 있는 페이지 입니다.");
          setOpen(true);
        }
      } catch (err) {
        if (err.response.status == 401) {
          alert("로그인이 필요한 서비스입니다.");
          navigate(`${URL.LOGIN_URL}`);
        }
        console.error("유저 상세 정보 불러오기 실패:", err);
      }
    };

    fetchUserDetail();
  }, []);

  const handleDetailSave = async () => {
    try {
      await createUserDetailInfo(detail);
      alert("사용자 상세정보 기입이 완료되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ex-container flex flex-col items-center gap-8">
      <RandomVideo data={exercises} />

      <div className="exercise-container flex-column gap-20">
        {/* ---- 기간 입력 ---- */}
        <section className="flex-column flex-center">
          <h2>운동 가능 기간 선택</h2>
          <div>
            <input
              type="number"
              min="1"
              max="31"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="며칠 동안 운동하나요? (1~31일)"
            />
          </div>
        </section>

        {/* ---- 운동 시간 선택 ---- */}
        <section className="flex-column flex-center">
          <h2>하루 운동 가능 시간 선택</h2>
          <div>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">운동 시간 선택</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}분
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ---- 추천 운동 생성 ---- */}
        <section className="flex-column flex-center">
          <h2>맞춤 운동 생성</h2>
          <div className="flex flex-column gap-10 flex-center">
            <p>운동 기간과 운동 시간을 입력하여 맞춤 운동을 생성하세요.</p>
            <button
              className="recommend-btn bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
              disabled={loading}
              onClick={handleGenerate}
            >
              {loading ? "추천 운동 생성중..." : "맞춤 운동 생성하기"}
            </button>
          </div>
        </section>
        {open && (
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div
              className="modal-content"
              style={{
                height: "80%", // 모달 높이 제한
                maxHeight: "80%", // 안전하게 maxHeight도 지정
                overflowY: "auto", // 세로 스크롤 가능
                padding: "20px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <UserDetailInfo
                detail={detail}
                setDetail={setDetail}
                handleDetailSave={handleDetailSave}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
