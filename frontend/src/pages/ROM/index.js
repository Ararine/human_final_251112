import { useRef, useEffect, useState } from "react";

import { romData } from "../../constants/sample";
import WebCamView from "./WebCamView";
import useSTT from "../../hooks/useSTT";
import useKoreanSpeaker from "../../hooks/useKoreanSpeaker";
import { usePoseDetection3d } from "../../hooks/usePoseDetection3d";
import RomTable from "./RomTable";

const ROM = () => {
  const videoRef = useRef(null);
  const [measuring, setMeasuring] = useState(false);
  const [maxAngles, setMaxAngles] = useState({});

  const { poses, angles } = usePoseDetection3d(videoRef);
  const { transcript, listening, setListening } = useSTT();
  const speak = useKoreanSpeaker();

  console.log(transcript);
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
    setMaxAngles({});
    speak("측정이 시작되었습니다.");
  };

  const stopMeasure = () => {
    console.log("측정 종료!");
    setMeasuring(false);
    speak("측정 종료되었습니다.");
  };

  // measuring = true일 때만 angles 최대값 갱신
  useEffect(() => {
    if (!measuring || !angles) return;

    setMaxAngles((prev) => {
      const updated = { ...prev };

      Object.keys(angles).forEach((key) => {
        const current = angles[key];
        const prevMax = prev[key] ?? -Infinity;

        if (current > prevMax) updated[key] = current;
      });

      return updated;
    });
  }, [angles, measuring]);

  // 측정 종료면 관절 데이터도 화면에서 숨기기
  const displayedPoses = measuring ? poses : null;
  useEffect(() => {
    const voicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const koreanVoices = voices.filter((v) => v.lang === "ko-KR");
      console.log("한국어 목소리 목록:", koreanVoices);
    };

    window.speechSynthesis.onvoiceschanged = voicesChanged;

    // 초기 호출
    voicesChanged();
  }, []);

  return (
    <div>
      <RomTable romData={romData} />
      <div style={{ margin: "30px 0px", display: "flex" }}>
        <WebCamView
          videoRef={videoRef}
          poses={displayedPoses} // 🔥 measuring=false면 pose 표시 안됨
          width="300px"
          height="300px"
        />

        <div style={{ marginLeft: "20px" }}>
          <p>인식된 말: {transcript}</p>
          <p>측정 상태: {measuring ? "측정 중" : "대기"}</p>

          <h3>🔥 현재 기록된 최대 각도</h3>
          <pre>{JSON.stringify(maxAngles, null, 2)}</pre>

          <button onClick={startMeasure}>측정 시작</button>
          <button onClick={stopMeasure}>측정 종료</button>
        </div>
      </div>
    </div>
  );
};

export default ROM;
