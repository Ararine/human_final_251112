import { useEffect, useState } from "react";
import "../../css/profile.css";
import UserInfo from "./UserInfo";

import { getLatestBodyIndex } from "../../api/Bmi";
import { getUserByUserId, updateUserByUserId } from "../../api/UserBase";
import UserDetailInfo from "./UserDetailInfo";
import Bmi from "../Bmi";
import {
  getUserDetailInfoByUserId,
  updateUserDetailInfo,
} from "../../api/UserDetail";
import BodyHistoryGraph from "../BodyHistory";

function timeStrToMinutes(timeStr) {
  if (!timeStr) return 0;
  // "0 days 02:30:00" → 150 (분)
  const parts = timeStr.split(" ");
  const hms = parts.length === 3 ? parts[2] : timeStr;
  const [h, m, s] = hms.split(":").map(Number);
  return h * 60 + m; // 초는 무시
}

function timeStrToHours(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(" ");
  const hms = parts.length === 3 ? parts[2] : timeStr;
  const [h, m, s] = hms.split(":").map(Number);
  return h + m / 60; // 소수점 시간
}
const UserDetail = ({ userInfo }) => {
  const [form, setForm] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
  });
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

  const [bmi, setBmi] = useState("");
  const [bmr, setBmr] = useState("");

  // 개인정보 입력 핸들러
  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      // gender는 string, 나머지는 float 처리
      const parsed =
        name === "gender" ? value : value === "" ? "" : parseFloat(value);

      setForm((prev) => ({
        ...prev,
        [name]: parsed,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 개인정보 저장
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateUserByUserId(
        userInfo.user_id,
        form.gender,
        form.age,
        form.height,
        form.weight
      );
      const res = await getLatestBodyIndex(userInfo.user_id);
      const data = res?.data[0];
      setBmi(data?.bmi ?? "");
      setBmr(data?.bmr ?? "");
      alert("개인정보가 저장되었습니다.");
    } catch (err) {
      console.error("개인정보 저장 실패:", err);
      alert("저장 실패");
    }
  };

  // 🔥 개인정보 불러오기
  useEffect(() => {
    const loadUserBaseInfo = async () => {
      if (!userInfo.user_id) return;

      try {
        let res = await getUserByUserId(userInfo.user_id);
        let data = res.data[0];

        setForm({
          gender: data.gender || "",
          age: data.age || "",
          height: data.height || "",
          weight: data.weight || "",
        });
        res = await getLatestBodyIndex(userInfo.user_id);
        data = res?.data[0];
        setBmi(data?.bmi ?? "");
        setBmr(data?.bmr ?? "");

        res = await getUserDetailInfoByUserId(userInfo.user_id);
        data = res?.data[0];
        setDetail({
          goal: data.goal || "",
          job: data.job || "",
          activity_level: data.activity_level || "",
          activity_duration: timeStrToMinutes(data.activity_duration),
          sleep_duration: timeStrToHours(data.sleep_duration),
          chronotype: data.chronotype || "",
          disease: data.disease ? data.disease.split(",") : [],
          equipment: data.equipment ? data.equipment.split(",") : [],
          food_restrictions: data.food_restrictions || "",
          water_intake: data.water_intake || "",
        });
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    loadUserBaseInfo();
  }, [userInfo.user_id]);

  const handleDetailSave = async () => {
    try {
      await updateUserDetailInfo(detail);
      alert("수정이 완료되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-page">
      {/* 1. 개인정보 관리 */}
      <UserInfo
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
      />
      <section className="profile-section">
        <Bmi bmi={bmi} bmr={bmr} />
      </section>

      <section className="profile-section">
        <BodyHistoryGraph userInfo={userInfo} />
      </section>
      <UserDetailInfo
        detail={detail}
        setDetail={setDetail}
        handleDetailSave={handleDetailSave}
      />
    </div>
  );
};

export default UserDetail;
