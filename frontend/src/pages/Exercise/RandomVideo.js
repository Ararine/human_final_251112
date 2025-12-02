import React, { useState, useEffect } from "react";

const RandomVideo = ({ data }) => {
  const [videoSrc, setVideoSrc] = useState("");
  // 랜덤 영상 선택 (연속 같은 영상 방지)
  const playRandomVideo = () => {
    if (data.length === 0) return;
    let nextVideo;
    do {
      const randomIndex = Math.floor(Math.random() * data.length);
      nextVideo = data[randomIndex].video;
    } while (nextVideo === videoSrc && data.length > 1);
    setVideoSrc(nextVideo);
  };
  // 페이지 로드 시 랜덤 영상 시작
  useEffect(() => {
    playRandomVideo();
  }, []);

  return (
    <>
      {videoSrc && (
        <div
          className="video-wrapper"
          style={{
            width: "640px",
            height: "360px",
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          <video
            controls
            autoPlay
            muted
            loop={false}
            width="100%"
            height="100%"
            src={videoSrc}
            onEnded={playRandomVideo} // 영상 끝나면 다음 랜덤 영상 재생
            preload="auto"
            style={{ objectFit: "contain" }}
          >
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
        </div>
      )}
    </>
  );
};
export default RandomVideo;
