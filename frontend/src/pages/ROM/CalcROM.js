import WebCamView from "./WebCamView";

function formatAnglesWithLabels(jointMap, angles) {
  if (!angles) return {};
  const formatted = {};
  Object.keys(angles).forEach((key) => {
    const label = jointMap[key] || key;
    const value = angles[key];
    formatted[label] = value != null ? Number(value.toFixed(1)) : null;
  });
  return formatted;
}

const CalcROM = ({
  videoRef,
  displayedPoses,
  transcript,
  measuring,
  angles,
  jointMap,
  resultAngles,
  startMeasure,
  stopMeasure,
}) => {
  return (
    <>
      <div style={{ margin: "30px 0px", display: "flex" }}>
        <WebCamView
          videoRef={videoRef}
          poses={displayedPoses}
          width="300px"
          height="300px"
        />

        <div style={{ marginLeft: "20px" }}>
          <p>인식된 말: {transcript}</p>
          <p>측정 상태: {measuring ? "측정 중" : "대기"}</p>
          {measuring ? (
            <>
              <h3>🔥 실시간 각도</h3>
              <pre>
                {JSON.stringify(
                  formatAnglesWithLabels(jointMap, angles),
                  null,
                  2
                )}
              </pre>
            </>
          ) : (
            <>
              <h3>🔥 측정 결과 (98% Quantile 기반)</h3>
              <pre>
                {JSON.stringify(
                  formatAnglesWithLabels(jointMap, resultAngles),
                  null,
                  2
                )}
              </pre>
            </>
          )}

          <button onClick={startMeasure}>측정 시작</button>
          <button onClick={stopMeasure}>측정 종료</button>
        </div>
      </div>
    </>
  );
};

export default CalcROM;
