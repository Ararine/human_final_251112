import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Model from "./Model";
import {
  get,
  angleAtJoint,
  directionToPitchRoll,
  jointEulerFromPoints,
} from "./utils";
export default function App({ poses }) {
  // console.log(poses);
  const kp = poses[0]?.keypoints3D;
  // 얼굴 / 머리
  const nose = get(kp, "nose");
  const leftEyeInner = get(kp, "left_eye_inner");
  const leftEye = get(kp, "left_eye");
  const leftEyeOuter = get(kp, "left_eye_outer");
  const rightEyeInner = get(kp, "right_eye_inner");
  const rightEye = get(kp, "right_eye");
  const rightEyeOuter = get(kp, "right_eye_outer");
  const leftEar = get(kp, "left_ear");
  const rightEar = get(kp, "right_ear");
  const mouthLeft = get(kp, "mouth_left");
  const mouthRight = get(kp, "mouth_right");

  // 상체
  const leftShoulder = get(kp, "left_shoulder");
  const rightShoulder = get(kp, "right_shoulder");
  const leftElbow = get(kp, "left_elbow");
  const rightElbow = get(kp, "right_elbow");
  const leftWrist = get(kp, "left_wrist");
  const rightWrist = get(kp, "right_wrist");

  // 손
  const leftPinky = get(kp, "left_pinky");
  const rightPinky = get(kp, "right_pinky");
  const leftIndex = get(kp, "left_index");
  const rightIndex = get(kp, "right_index");
  const leftThumb = get(kp, "left_thumb");
  const rightThumb = get(kp, "right_thumb");

  // 하체
  const leftHip = get(kp, "left_hip");
  const rightHip = get(kp, "right_hip");
  const leftKnee = get(kp, "left_knee");
  const rightKnee = get(kp, "right_knee");
  const leftAnkle = get(kp, "left_ankle");
  const rightAnkle = get(kp, "right_ankle");
  const leftHeel = get(kp, "left_heel");
  const rightHeel = get(kp, "right_heel");
  const leftFootIndex = get(kp, "left_foot_index");
  const rightFootIndex = get(kp, "right_foot_index");

  let bodyEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (leftHip && rightHip && leftShoulder && rightShoulder) {
    bodyEuler = jointEulerFromPoints(
      {
        x: (leftHip.x + rightHip.x) / 2,
        y: (leftHip.y + rightHip.y) / 2,
        z: (leftHip.z + rightHip.z) / 2,
      }, // joint = hip center
      {
        x: (leftShoulder.x + rightShoulder.x) / 2,
        y: (leftShoulder.y + rightShoulder.y) / 2,
        z: (leftShoulder.z + rightShoulder.z) / 2,
      }, // child = shoulder center
      leftShoulder, // grandChild (방향 안정화)
      rightHip // reference
    );
  }
  let leftShoulderEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (leftShoulder && leftElbow && leftWrist && rightShoulder) {
    leftShoulderEuler = jointEulerFromPoints(
      leftShoulder,
      leftElbow,
      leftWrist,
      rightShoulder
    );
  }
  let rightShoulderEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (rightShoulder && rightElbow && rightWrist && leftShoulder) {
    rightShoulderEuler = jointEulerFromPoints(
      rightShoulder,
      rightElbow,
      rightWrist,
      leftShoulder
    );
  }
  let leftUpperArmEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (leftShoulder && leftElbow && leftWrist) {
    leftUpperArmEuler = jointEulerFromPoints(
      leftShoulder,
      leftElbow,
      leftWrist,
      {
        x: rightShoulder.x,
        y: rightShoulder.y,
        z: rightShoulder.z,
      }
    );
  }
  let rightUpperArmEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (rightShoulder && rightElbow && rightWrist) {
    rightUpperArmEuler = jointEulerFromPoints(
      rightShoulder,
      rightElbow,
      rightWrist,
      {
        x: leftShoulder.x,
        y: leftShoulder.y,
        z: leftShoulder.z,
      }
    );
  }
  let leftElbowEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (leftShoulder && leftElbow && leftWrist) {
    leftElbowEuler.pitch = angleAtJoint(leftShoulder, leftElbow, leftWrist);
  }
  let rightElbowEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (rightShoulder && rightElbow && rightWrist) {
    rightElbowEuler.pitch = angleAtJoint(rightShoulder, rightElbow, rightWrist);
  }
  let leftHipEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (leftHip && leftKnee && leftAnkle && rightHip) {
    leftHipEuler = jointEulerFromPoints(leftHip, leftKnee, leftAnkle, rightHip);
  }
  let rightHipEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (rightHip && rightKnee && rightAnkle && leftHip) {
    rightHipEuler = jointEulerFromPoints(
      rightHip,
      rightKnee,
      rightAnkle,
      leftHip
    );
  }
  let leftKneeEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (leftHip && leftKnee && leftAnkle) {
    leftKneeEuler.pitch = angleAtJoint(leftHip, leftKnee, leftAnkle);
  }
  let rightKneeEuler = { pitch: 0, roll: 0, yaw: 0 };

  if (rightHip && rightKnee && rightAnkle) {
    rightKneeEuler.pitch = angleAtJoint(rightHip, rightKnee, rightAnkle);
  }

  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 환경광 */}
      <Environment preset="studio" />

      {/* GLB 모델 */}
      <Model
        pose={{
          /* ========= BODY ========= */

          mixamorigHips_01: {
            x: bodyEuler.pitch,
            y: bodyEuler.yaw,
            z: bodyEuler.roll,
          },

          mixamorigSpine_02: {
            y: bodyEuler.yaw * 0.4,
          },
          mixamorigSpine1_03: {
            x: bodyEuler.pitch * 0.4,
          },
          mixamorigSpine2_04: {
            z: bodyEuler.roll * 0.4,
          },

          /* ========= LEFT ARM ========= */

          mixamorigLeftShoulder_08: {
            x: leftShoulderEuler.pitch,
            z: -leftShoulderEuler.roll,
          },

          mixamorigLeftArm_09: {
            y: leftUpperArmEuler.yaw,
          },

          mixamorigLeftForeArm_010: {
            x: leftElbowEuler.pitch,
          },

          /* ========= RIGHT ARM ========= */

          mixamorigRightShoulder_032: {
            x: rightShoulderEuler.pitch,
            z: rightShoulderEuler.roll,
          },

          mixamorigRightArm_033: {
            y: rightUpperArmEuler.yaw,
          },

          mixamorigRightForeArm_034: {
            x: rightElbowEuler.pitch,
          },

          /* ========= LEFT LEG ========= */

          mixamorigLeftUpLeg_056: {
            x: leftHipEuler.pitch,
            z: leftHipEuler.roll,
          },

          mixamorigLeftLeg_057: {
            x: leftKneeEuler.pitch,
          },

          /* ========= RIGHT LEG ========= */

          mixamorigRightUpLeg_061: {
            x: rightHipEuler.pitch,
            z: rightHipEuler.roll,
          },

          mixamorigRightLeg_00: {
            x: rightKneeEuler.pitch,
          },
        }}
      />

      {/* 마우스로 회전/줌 */}
      <OrbitControls />
    </Canvas>
  );
}
