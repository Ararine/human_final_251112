import { useState, useEffect } from "react";
import "../../css/subscribe.css";

const SubscribeManage = ({ userInfo }) => {
  // 서버에서 가져온다고 가정하는 구독 정보
  const [subInfo, setSubInfo] = useState({
    isSubscribed: false,
    plan: "",
    expireDate: "",
    daysLeft: 0,
  });

  useEffect(() => {
    // TODO: 실제 API 연동
    // fetch("/api/subscription/info?userId=" + userInfo.id)
    //   .then(res => res.json())
    //   .then(data => setSubInfo(data));

    // 테스트용 데이터
    setSubInfo({
      isSubscribed: true,
      plan: "Premium",
      expireDate: "2025-01-31",
      daysLeft: 42,
    });
  }, []);

  const handleSubscribe = () => {
    alert("구독 등록 API 호출됨");
  };

  const handleExtend = () => {
    alert("구독 연장 API 호출됨");
  };

  const handleCancel = () => {
    const ok = window.confirm("정말 구독을 취소하시겠습니까?");
    if (!ok) return;

    alert("구독 취소 API 호출됨");
  };

  return (
    <div className="sub-manage-page">
      <h2 className="sub-title">구독 관리</h2>

      <div className="sub-card">
        {subInfo.isSubscribed ? (
          <>
            <h3 className="active-title">현재 구독 상태</h3>

            <div className="sub-info">
              <p>
                구독 플랜: <b>{subInfo.plan}</b>
              </p>
              <p>만료일: {subInfo.expireDate}</p>
              <p>
                남은 일수: <b>{subInfo.daysLeft}일</b>
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
            <h3 className="inactive-title">아직 구독 중이 아닙니다</h3>
            <p>지금 구독을 등록하고 HomeFit의 모든 기능을 이용해보세요!</p>

            <button className="btn subscribe" onClick={handleSubscribe}>
              구독 등록하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribeManage;
