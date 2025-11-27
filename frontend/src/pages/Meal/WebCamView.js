import Webcam from "../../components/Webcam";
import PoseCanvas from "../../components/PoseCanvas";
const WebCamView = ({ videoRef, poses, width = "100%", height = "100%" }) => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: width,
          height: height,
        }}
      >
        <Webcam videoRef={videoRef} />
        <PoseCanvas videoRef={videoRef} poses={poses} />
      </div>
    </>
  );
};

export default WebCamView;
