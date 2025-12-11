import { useRef, useEffect, useState } from "react";

import { romData } from "../../constants/sample";
import useSTT from "../../hooks/useSTT";
import useKoreanSpeaker from "../../hooks/useKoreanSpeaker";
import { usePoseDetection3d } from "../../hooks/usePoseDetection3d";
import RomTable from "./RomTable";
import ROMImageSlider from "./RomImageSlider";
import CalcROM from "./CalcROM";
import Object3D from "./Object3D";

// 🔥 배열에서 quantile 계산 함수
function quantile(arr, q) {
  if (!arr || arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

const romImages = {
  어깨정면: "어깨정면.png",
  팔꿈치: "팔꿈치.png",
  손목: "손목.png",
  엉덩이: "엉덩이.png",
  무릎: "무릎.png",
  발목: "발목.png",
};

const jointMap = {
  leftShoulderFlex: "왼쪽 어깨 굴곡",
  rightShoulderFlex: "오른쪽 어깨 굴곡",
  // leftShoulderAbd: "왼쪽 어깨 외전",
  // rightShoulderAbd: "오른쪽 어깨 외전",
  leftElbow: "왼쪽 팔꿈치",
  rightElbow: "오른쪽 팔꿈치",
  leftWristFlex: "왼쪽 손목 굴곡",
  rightWristFlex: "오른쪽 손목 굴곡",
  leftHipFlex: "왼쪽 엉덩이 굴곡",
  rightHipFlex: "오른쪽 엉덩이 굴곡",
  leftKnee: "왼쪽 무릎",
  rightKnee: "오른쪽 무릎",
  leftAnkle: "왼쪽 발목",
  rightAnkle: "오른쪽 발목",
};

const ROM = ({ userInfo }) => {
  const videoRef = useRef(null);
  const [measuring, setMeasuring] = useState(false);
  const [resultAngles, setResultAngles] = useState({});

  const angleHistoryRef = useRef({}); // 🔥 각 관절별 angle 히스토리
  const { poses, angles } = usePoseDetection3d(videoRef);
  const [selectedJoint, setSelectedJoint] = useState(Object.keys(jointMap)[0]);

  const { transcript, setListening } = useSTT();
  const speak = useKoreanSpeaker();

  // 사이트 들어오면 자동 STT on
  useEffect(() => {
    setListening(true);
  }, []);

  // 음성 명령 처리
  useEffect(() => {
    if (!transcript) return;

    if (transcript.includes("측정 시작")) startMeasure();
    if (transcript.includes("측정 종료")) stopMeasure();
  }, [transcript]);

  const startMeasure = () => {
    console.log("측정 시작!");
    setMeasuring(true);
    angleHistoryRef.current = {}; // 각도 히스토리 초기화
    speak("측정이 시작되었습니다.");
  };

  const stopMeasure = () => {
    console.log("측정 종료!");
    setMeasuring(false);

    const finalResults = {};
    const history = angleHistoryRef.current;

    Object.keys(history).forEach((key) => {
      const arr = history[key];
      if (!arr || arr.length === 0) return;

      // 🔥 98% quantile 로 ROM 산출
      finalResults[key] = quantile(arr, 0.98);
    });
    setResultAngles((prev) => ({
      ...prev, // 기존 resultAngles 유지
      [selectedJoint]: finalResults[selectedJoint], // 선택한 관절 값만 업데이트
    }));

    speak("측정 종료되었습니다.");
  };

  // 🔥 measuring = true일 때만 각도 history 저장
  useEffect(() => {
    if (!measuring || !angles) return;

    Object.keys(angles).forEach((key) => {
      if (!angleHistoryRef.current[key]) {
        angleHistoryRef.current[key] = [];
      }

      const arr = angleHistoryRef.current[key];
      arr.push(angles[key]);

      // 🔥 최근 150 프레임만 저장 (메모리 안전)
      if (arr.length > 150) arr.shift();
    });
  }, [angles, measuring]);

  // 측정 중일 때만 pose 표시
  const displayedPoses = measuring ? poses : null;

  // 브라우저 voice 목록 출력 (디버그)
  useEffect(() => {
    const voicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const koreanVoices = voices.filter((v) => v.lang === "ko-KR");
      console.log("한국어 목소리 목록:", koreanVoices);
    };

    window.speechSynthesis.onvoiceschanged = voicesChanged;
    voicesChanged();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <RomTable romData={romData} />
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <ROMImageSlider romImages={romImages} />
        </div>
      </div>
      <label htmlFor="joint-select" style={{ marginRight: "10px" }}>
        관절 선택:
      </label>
      <select
        id="joint-select"
        value={selectedJoint}
        onChange={(e) => setSelectedJoint(e.target.value)}
        style={{ padding: "5px 10px", borderRadius: "5px" }}
      >
        {Object.entries(jointMap).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      {userInfo?.type !== "normal" && (
        <>
          <div className="flex-row">
            <CalcROM
              videoRef={videoRef}
              displayedPoses={displayedPoses}
              transcript={transcript}
              measuring={measuring}
              angles={angles}
              jointMap={jointMap}
              resultAngles={resultAngles}
              startMeasure={startMeasure}
              stopMeasure={stopMeasure}
            />
            <Object3D poses={poses} />
          </div>
        </>
      )}
    </div>
  );
};

export default ROM;
