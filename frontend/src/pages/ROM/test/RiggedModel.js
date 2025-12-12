// components/RiggedModel.js
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { keypointsToMap, normalizePose, solveTwoBoneIK } from "./utils";

// ===== 튜닝 파라미터 =====
const POSE_SCALE = 0.01;

// 모델이 포즈(미디어파이프) 좌표계랑 축이 다르면 여기서 보정
// 예: 예전에 scene.rotation.x = -Math.PI/2 했던 케이스면 +Math.PI/2를 포즈에 적용하는 식
// const POSE_TO_GLB_ROT_X = Math.PI;
const POSE_TO_GLB_ROT_X = 0;

// 디버깅용 토글
const ENABLE_ROOT_Y = true;
const ENABLE_PELVIS_LOOK = false; // 처음엔 false 추천
const ENABLE_ARM_IK = true;
const ENABLE_LEG_IK = true;
const ENABLE_PELVIS_YAW = true;
// --------------------------------------------------

function getBoneWorldPos(bone) {
  if (!bone) return null;
  const v = new THREE.Vector3();
  bone.getWorldPosition(v);
  return v;
}

function getMid(a, b) {
  return a.clone().add(b).multiplyScalar(0.5);
}

function poseVecToGLB(v) {
  // normalizePose에서 z를 뒤집고 있으니,
  // 여기서는 모델 축 보정(필요한 경우)만 적용
  return v
    .clone()
    .applyAxisAngle(new THREE.Vector3(1, 0, 0), POSE_TO_GLB_ROT_X);
}

function posePointToWorld(posePoint, originWorld) {
  // posePoint: hipMid 기준 상대좌표(포즈 공간)
  // originWorld: GLB에서 hip(root) 월드 위치
  return originWorld.clone().add(poseVecToGLB(posePoint));
}
// root 기준 forward (pole용)
function getRootForward(root) {
  const q = new THREE.Quaternion();
  root.getWorldQuaternion(q);
  return new THREE.Vector3(0, 0, 1).applyQuaternion(q).normalize();
}

export default function RiggedModel({ url, poses }) {
  const { scene } = useGLTF(url);

  const bones = useRef({});
  const baseRootY = useRef(null);

  // pole 벡터는 재사용 (매 프레임 new 방지)
  // ✅ 팔꿈치: 앞으로 접힘
  const armPoleL = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const armPoleR = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  // ✅ 무릎: 앞으로 접힘 (중요)
  const legPoleL = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const legPoleR = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  useEffect(() => {
    if (!scene) return;
    // 필요하면 여기서 모델 회전/스케일 보정
    // scene.rotation.x = -Math.PI / 2;

    bones.current = {
      root: scene.getObjectByName("mixamorigHips_01"),

      spine: scene.getObjectByName("mixamorigSpine_02"),
      spine1: scene.getObjectByName("mixamorigSpine1_03"),
      spine2: scene.getObjectByName("mixamorigSpine2_04"),
      head: scene.getObjectByName("mixamorigHead_06"),

      leftUpperArm: scene.getObjectByName("mixamorigLeftArm_09"),
      leftLowerArm: scene.getObjectByName("mixamorigLeftForeArm_010"),

      rightUpperArm: scene.getObjectByName("mixamorigRightArm_033"),
      rightLowerArm: scene.getObjectByName("mixamorigRightForeArm_034"),

      leftUpperLeg: scene.getObjectByName("mixamorigLeftUpLeg_056"),
      leftLowerLeg: scene.getObjectByName("mixamorigLeftLeg_057"),

      rightUpperLeg: scene.getObjectByName("mixamorigRightUpLeg_061"),
      rightLowerLeg: scene.getObjectByName("mixamorigRightLeg_00"),
    };

    // 본 이름 디버그(필요할 때만)
    // scene.traverse(o => { if (o.name.includes("RightLeg")) console.log(o.name); });
  }, [scene]);

  useFrame(() => {
    if (!poses?.length) return;
    const b = bones.current;
    if (!b.root) return;

    b.root.updateWorldMatrix(true, true);
    const map = keypointsToMap(poses[0].keypoints3D);
    const pose = normalizePose(map, POSE_SCALE);

    const {
      left_shoulder: LS,
      right_shoulder: RS,
      left_elbow: LE,
      right_elbow: RE,
      left_wrist: LW,
      right_wrist: RW,

      left_hip: LH,
      right_hip: RH,
      left_knee: LK,
      right_knee: RK,
      left_ankle: LA,
      right_ankle: RA,

      left_heel: LHEEL,
      right_heel: RHEEL,
    } = pose;

    // 기준 원점: GLB hips(root) 월드 위치
    const rootWorld = getBoneWorldPos(b.root);
    if (!rootWorld) return;

    // -----------------------
    // Root Y (바닥 보정)
    // -----------------------
    if (ENABLE_ROOT_Y && LHEEL && RHEEL) {
      if (baseRootY.current === null) {
        baseRootY.current = b.root.position.y;
      }

      const heelL = poseVecToGLB(LHEEL);
      const heelR = poseVecToGLB(RHEEL);

      b.root.position.y = baseRootY.current - Math.min(heelL.y, heelR.y);
    }

    // -----------------------
    // Pelvis Yaw (중요)
    // -----------------------
    if (ENABLE_PELVIS_YAW && LH && RH && LS && RS) {
      const poseDir = getMid(LS, RS).sub(getMid(LH, RH));
      poseDir.y = 0;
      if (poseDir.lengthSq() > 0) {
        poseDir.normalize();
        const glbDir = poseVecToGLB(poseDir).normalize();

        const qYaw = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          glbDir
        );

        b.root.quaternion.slerp(qYaw, 0.2);
      }
    }

    // pole 벡터 (root 기준)
    const rootForward = getRootForward(b.root);
    const armPoleL = rootForward.clone();
    const armPoleR = rootForward.clone();
    const legPoleL = rootForward.clone();
    const legPoleR = rootForward.clone();
    // -----------------------
    // Arms IK (WORLD)
    // -----------------------
    if (ENABLE_ARM_IK) {
      // 타겟을 rootWorld 기준으로 월드화
      if (b.leftUpperArm && b.leftLowerArm && LS && LE && LW) {
        const shoulderW = getBoneWorldPos(b.leftUpperArm);
        if (!shoulderW) return;

        const elbowW = posePointToWorld(LE, rootWorld);
        const wristW = posePointToWorld(LW, rootWorld);

        solveTwoBoneIK(
          b.leftUpperArm,
          b.leftLowerArm,
          shoulderW,
          elbowW,
          wristW,
          armPoleL
        );
      }

      if (b.rightUpperArm && b.rightLowerArm && RS && RE && RW) {
        const hipW = getBoneWorldPos(b.rightUpperArm);
        if (hipW) {
          const elbowW = posePointToWorld(RE, rootWorld);
          const wristW = posePointToWorld(RW, rootWorld);
          solveTwoBoneIK(
            b.rightUpperArm,
            b.rightLowerArm,
            hipW,
            elbowW,
            wristW,
            armPoleR
          );
        }
      }
    }

    // -----------------------
    // Legs IK (WORLD)
    // -----------------------
    if (ENABLE_LEG_IK) {
      // Left leg
      if (b.leftUpperLeg && b.leftLowerLeg && LH && LK && LA) {
        const hipW = getBoneWorldPos(b.leftUpperLeg);
        if (!hipW) return;

        const kneeW = posePointToWorld(LK, rootWorld);
        const ankleW = posePointToWorld(LA, rootWorld);

        solveTwoBoneIK(
          b.leftUpperLeg,
          b.leftLowerLeg,
          hipW,
          kneeW,
          ankleW,
          legPoleL
        );
      }

      // Right leg
      if (b.rightUpperLeg && b.rightLowerLeg && RH && RK && RA) {
        const hipW = getBoneWorldPos(b.rightUpperLeg);
        if (!hipW) return;

        const kneeW = posePointToWorld(RK, rootWorld);
        const ankleW = posePointToWorld(RA, rootWorld);

        solveTwoBoneIK(
          b.rightUpperLeg,
          b.rightLowerLeg,
          hipW,
          kneeW,
          ankleW,
          legPoleR
        );
      }
    }
  });

  return <primitive object={scene} scale={[1, 1.5, 1]} />;
}
