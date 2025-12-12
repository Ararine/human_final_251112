const ROMImageSlider = ({ romImages, currentIndex, setCurrentIndex }) => {
  const joints = Object.keys(romImages); // ["어깨정면", "팔꿈치", ...]

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? joints.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === joints.length - 1 ? 0 : prev + 1));
  };

  if (!joints || joints.length === 0) return null;

  const currentJoint = joints[currentIndex];
  const currentImg = romImages[currentJoint];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={`/rom/${currentImg}`}
        alt={currentJoint}
        style={{
          width: "400px",
          height: "400px",
          objectFit: "contain",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        }}
      />

      <p style={{ margin: "5px 0" }}>{currentJoint}</p>

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
