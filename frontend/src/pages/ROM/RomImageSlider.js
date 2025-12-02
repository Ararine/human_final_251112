import { useState } from "react";

const ROMImageSlider = ({ romImages }) => {
  const joints = Object.keys(romImages); // ["어깨정면", "팔꿈치", ...]
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? joints.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === joints.length - 1 ? 0 : prev + 1));
  };

  if (!joints || joints.length === 0) return null;

  const currentJoint = joints[currentIndex]; // 현재 선택된 관절
  const currentImg = romImages[currentJoint]; // 해당 관절 이미지

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* 이미지 Preview */}
      <img
        src={`/rom/${currentImg}`}
        alt={currentJoint}
        style={{
          width: "400px", // 고정된 가로
          height: "400px", // 고정된 세로
          objectFit: "contain", // 비율 유지, 빈 공간 생김
          borderRadius: "8px",
          backgroundColor: "#f5f5f5", // 여백 색 지정 (선택 사항)
        }}
      />

      <p style={{ margin: "5px 0" }}>{currentJoint}</p>

      {/* Prev / Next 버튼 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={prevImage}>Prev</button>
        <span>
          {currentIndex + 1} / {joints.length}
        </span>
        <button onClick={nextImage}>Next</button>
      </div>
    </div>
  );
};

export default ROMImageSlider;
