import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

// 3D 관절 각도 계산
function calculateAngle3D(A, B, C) {
  if (!A || !B || !C) return null;

  const zA = A.z ?? 0;
  const zB = B.z ?? 0;
  const zC = C.z ?? 0;

  const AB = { x: A.x - B.x, y: A.y - B.y, z: zA - zB };
  const CB = { x: C.x - B.x, y: C.y - B.y, z: zC - zB };

  const dot = AB.x * CB.x + AB.y * CB.y + AB.z * CB.z;
  const magAB = Math.sqrt(AB.x ** 2 + AB.y ** 2 + AB.z ** 2);
  const magCB = Math.sqrt(CB.x ** 2 + CB.y ** 2 + CB.z ** 2);

  if (magAB === 0 || magCB === 0) return null;

  const angleRad = Math.acos(Math.min(Math.max(dot / (magAB * magCB), -1), 1));
  return (angleRad * 180) / Math.PI;
}

// Keypoint getter
const kp = (keypoints, name) => {
  const p = keypoints.find((k) => k.name === name);
  if (!p) console.warn("Missing keypoint:", name);
  return p;
};

export function usePoseDetection3d(videoRef) {
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const [poses, setPoses] = useState([]);
  const [angles, setAngles] = useState({});

  // TFJS 초기화
  useEffect(() => {
    (async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TFJS backend:", tf.getBackend());
    })();
  }, []);

  // BlazePose 3D 모델 로드
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const detector = await posedetection.createDetector(
          posedetection.SupportedModels.BlazePose,
          {
            runtime: "mediapipe",
            modelType: "lite",
            enableSmoothing: true,
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
          }
        );
        if (!cancelled) detectorRef.current = detector;
      } catch (err) {
        console.error("Pose detector loading error:", err);
      }
    })();

    return () => {
      cancelled = true;
      if (detectorRef.current) {
        detectorRef.current.dispose?.();
        detectorRef.current = null;
      }
    };
  }, []);

  // 실시간 포즈 추정 및 각도 계산
  useEffect(() => {
    const detectPose = async () => {
      const video = videoRef.current;
      const detector = detectorRef.current;

      if (video && detector && video.readyState >= 2) {
        try {
          const estimatedPoses = await detector.estimatePoses(video, {
            flipHorizontal: false,
          });

          if (!estimatedPoses || estimatedPoses.length === 0) {
            rafRef.current = requestAnimationFrame(detectPose);
            return;
          }

          const pose = estimatedPoses[0];

          const keypoints = pose.keypoints3D?.length
            ? pose.keypoints3D
            : pose.keypoints;

          if (!keypoints) {
            rafRef.current = requestAnimationFrame(detectPose);
            return;
          }

          /* ---------------------------
           *   ★ 관절 각도 계산 부분 ★
           * ---------------------------
           */

          // Elbow
          const leftElbow = calculateAngle3D(
            kp(keypoints, "left_shoulder"),
            kp(keypoints, "left_elbow"),
            kp(keypoints, "left_wrist")
          );
          const rightElbow = calculateAngle3D(
            kp(keypoints, "right_shoulder"),
            kp(keypoints, "right_elbow"),
            kp(keypoints, "right_wrist")
          );

          // Shoulder Flexion & Abduction
          const leftShoulderFlex = calculateAngle3D(
            kp(keypoints, "left_elbow"),
            kp(keypoints, "left_shoulder"),
            kp(keypoints, "left_hip")
          );
          const rightShoulderFlex = calculateAngle3D(
            kp(keypoints, "right_elbow"),
            kp(keypoints, "right_shoulder"),
            kp(keypoints, "right_hip")
          );

          const leftShoulderAbd = leftShoulderFlex;
          const rightShoulderAbd = rightShoulderFlex;

          // Wrist Flexion
          const leftWristFlex = calculateAngle3D(
            kp(keypoints, "left_elbow"),
            kp(keypoints, "left_wrist"),
            kp(keypoints, "left_index")
          );
          const rightWristFlex = calculateAngle3D(
            kp(keypoints, "right_elbow"),
            kp(keypoints, "right_wrist"),
            kp(keypoints, "right_index")
          );

          // Hip Flexion
          const leftHipFlex = calculateAngle3D(
            kp(keypoints, "left_knee"),
            kp(keypoints, "left_hip"),
            kp(keypoints, "left_shoulder")
          );
          const rightHipFlex = calculateAngle3D(
            kp(keypoints, "right_knee"),
            kp(keypoints, "right_hip"),
            kp(keypoints, "right_shoulder")
          );

          // Knee Flexion
          const leftKnee = calculateAngle3D(
            kp(keypoints, "left_hip"),
            kp(keypoints, "left_knee"),
            kp(keypoints, "left_ankle")
          );
          const rightKnee = calculateAngle3D(
            kp(keypoints, "right_hip"),
            kp(keypoints, "right_knee"),
            kp(keypoints, "right_ankle")
          );

          // Ankle Dorsiflexion
          const leftAnkle = calculateAngle3D(
            kp(keypoints, "left_knee"),
            kp(keypoints, "left_ankle"),
            kp(keypoints, "left_foot_index")
          );
          const rightAnkle = calculateAngle3D(
            kp(keypoints, "right_knee"),
            kp(keypoints, "right_ankle"),
            kp(keypoints, "right_foot_index")
          );

          /* ---------------------------
           *   저장
           * ---------------------------
           */
          setPoses([pose]);

          setAngles({
            // Shoulders
            leftShoulderFlex,
            rightShoulderFlex,
            leftShoulderAbd,
            rightShoulderAbd,

            // Elbows
            leftElbow,
            rightElbow,

            // Wrists
            leftWristFlex,
            rightWristFlex,

            // Hips
            leftHipFlex,
            rightHipFlex,

            // Knees
            leftKnee,
            rightKnee,

            // Ankles
            leftAnkle,
            rightAnkle,
          });
        } catch (err) {
          console.error("Pose estimation error:", err);
        }
      }

      rafRef.current = requestAnimationFrame(detectPose);
    };

    rafRef.current = requestAnimationFrame(detectPose);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  return { poses, angles };
}
