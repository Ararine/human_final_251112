import { useEffect, useMemo, useState } from "react";
import "../../css/subscribeManage.css";

const formatDateKR = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
};

const calcDaysLeft = (expireDate) => {
  if (!expireDate) return 0;
  const end = new Date(expireDate);
  if (Number.isNaN(end.getTime())) return 0;
  const today = new Date();
  // 날짜 단위로만 비교(시간 때문에 -1 되는 거 방지)
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const b = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const diff = Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

const calcProgress = (startDate, expireDate) => {
  // start~expire 기준으로 진행률. start 없으면 30일 플랜 가정.
  const end = new Date(expireDate);
  if (Number.isNaN(end.getTime())) return 0;

  const today = new Date();
  const s = startDate
    ? new Date(startDate)
    : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
  if (Number.isNaN(s.getTime())) return 0;

  const total = Math.max(1, (end - s) / (1000 * 60 * 60 * 24));
  const used = Math.max(0, (today - s) / (1000 * 60 * 60 * 24));
  const pct = Math.min(100, Math.max(0, (used / total) * 100));
  return Math.round(pct);
};

export default function SubscribeManage({ userInfo }) {
  const [subInfo, setSubInfo] = useState({
    isSubscribed: false,
    plan: "",
    expireDate: "",
    startDate: "", // 있으면 더 정확한 progress
  });

  useEffect(() => {
    // TODO: 실제 API 연동
    // fetch("/api/subscription/info?userId=" + userInfo.id)
    //   .then(res => res.json())
    //   .then(data => setSubInfo(data));

    // 테스트용
    setSubInfo({
      isSubscribed: true,
      plan: "Premium",
      startDate: "2024-12-31",
      expireDate: "2025-01-31",
    });
  }, [userInfo?.id]);

  const daysLeft = useMemo(
    () => calcDaysLeft(subInfo.expireDate),
    [subInfo.expireDate]
  );
  const isExpired = subInfo.isSubscribed && daysLeft === 0;
  const status = !subInfo.isSubscribed
    ? "none"
    : isExpired
    ? "expired"
    : "active";

  const progress = useMemo(
    () =>
      subInfo.isSubscribed
        ? calcProgress(subInfo.startDate, subInfo.expireDate)
        : 0,
    [subInfo.isSubscribed, subInfo.startDate, subInfo.expireDate]
  );

  const handleExtend = () => alert("구독 연장 API 호출됨");
  const handleCancel = () => {
    const ok = window.confirm("정말 구독을 취소하시겠습니까?");
    if (!ok) return;
    alert("구독 취소 API 호출됨");
  };
  const handleGoPlans = () => {
    // 라우터 쓰면 navigate("/subscribe")로 바꾸면 됨
    window.location.href = "/subscribe";
  };

  return (
    <div className="sub-manage-page">
      <div className="sub-hero">
        <h2 className="sub-title">구독 관리</h2>
        <p className="sub-desc">
          현재 구독 상태와 만료일을 확인하고, 연장/해지를 관리할 수 있어요.
        </p>
      </div>

      <div className={`sub-card ${status}`}>
        <div className="sub-card-head">
          <div className="sub-head-left">
            <h3 className="sub-card-title">내 구독</h3>
            <span className={`status-badge ${status}`}>
              {status === "active" && "Active"}
              {status === "expired" && "Expired"}
              {status === "none" && "No Plan"}
            </span>
          </div>

          {subInfo.isSubscribed ? (
            <div className="sub-plan-pill">
              <span className="pill-label">플랜</span>
              <b className="pill-value">{subInfo.plan}</b>
            </div>
          ) : null}
        </div>

        {subInfo.isSubscribed ? (
          <>
            <div className="sub-grid">
              <div className="sub-item">
                <span className="sub-k">만료일</span>
                <span className="sub-v">
                  {formatDateKR(subInfo.expireDate)}
                </span>
              </div>
              <div className="sub-item">
                <span className="sub-k">남은 일수</span>
                <span className="sub-v">
                  <b>{daysLeft}일</b>
                </span>
              </div>
            </div>

            <div className="sub-progress">
              <div className="progress-top">
                <span className="progress-label">이용 진행률</span>
                <span className="progress-value">{progress}%</span>
              </div>
              <div
                className="progress-track"
                aria-label="subscription progress"
              >
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="progress-hint">
                {isExpired
                  ? "만료된 구독입니다. 연장하면 바로 이용이 재개돼요."
                  : "만료 전에 연장하면 끊김 없이 이용할 수 있어요."}
              </p>
            </div>

            <div className="btn-group">
              <button className="btn extend" onClick={handleExtend}>
                구독 연장하기
              </button>
              <button className="btn cancel" onClick={handleCancel}>
                구독 취소하기
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="sub-empty">
              아직 구독 중이 아닙니다. 지금 구독을 등록하고 HomeFit의 모든
              기능을 이용해보세요!
            </p>
            <div className="btn-group single">
              <button className="btn subscribe" onClick={handleGoPlans}>
                구독 플랜 보러가기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
