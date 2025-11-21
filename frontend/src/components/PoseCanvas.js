import React, { useEffect, useRef } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";

const PoseCanvas = ({ videoRef, poses }) => {
  // 미디어파이프 공홈 구동
  // https://mediapipe-studio.webapps.google.com/demo/pose_landmarker?hl=ko

  // 도큐먼트
  // https://www.npmjs.com/package/@tensorflow-models/pose-detection
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!poses || poses.length === 0) return;
    const keypoints = poses[0].keypoints;

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);

    // Keypoints
    // keypoints.forEach((kp) => {
    //   if (kp.score > 0.3) {
    //     ctx.beginPath();
    //     ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
    //     ctx.fillStyle = "red";
    //     ctx.fill();
    //   }
    // });

    const scaleX = canvas.width / video.videoWidth;
    const scaleY = canvas.height / video.videoHeight;

    keypoints.forEach((kp) => {
      if (kp.score > 0.3) {
        ctx.beginPath();
        ctx.arc(kp.x * scaleX, kp.y * scaleY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });

    // Skeleton
    const adjacentPairs = posedetection.util.getAdjacentPairs(
      posedetection.SupportedModels.BlazePose
    );
    adjacentPairs.forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];
      if (kp1.score > 0.3 && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "lime";
        ctx.stroke();
      }
    });

    ctx.restore();
  }, [poses, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "inherit",
        height: "inherit",
        pointerEvents: "none",
      }}
    />
  );
};

export default PoseCanvas;
