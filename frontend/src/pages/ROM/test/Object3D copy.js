import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Pose3D from "../../../components/Pose3D";

/* =========================
   Utils: Pose 처리
========================= */

function keypointsToMap(keypoints3D) {
  const map = {};
  for (const k of keypoints3D) {
    map[k.name] = k;
  }
  return map;
}

function normalizePose(map, scale = 1) {
  const get = (n) =>
    new THREE.Vector3(map[n].x, map[n].y, -map[n].z).multiplyScalar(scale);

  const LH = get("left_hip");
  const RH = get("right_hip");
  const hipMid = LH.clone().add(RH).multiplyScalar(0.5);

  const out = {};
  for (const k in map) {
    out[k] = get(k).sub(hipMid);
  }

  return out;
}

/** p가 Vector3든 object든 Vector3로 */
const toV3 = (p) =>
  p?.isVector3 ? p.clone() : new THREE.Vector3(p.x, p.y, p.z);

/* =========================
   Rigged Model
========================= */

const RiggedModel = ({ url, poses }) => {
  const { scene } = useGLTF(url);

  const bones = useRef({});
  const baseRootY = useRef(null);

  // ⭐ 여기만 튜닝
  const POSE_SCALE = 2.0;

  /* =========================
     Init bones
  ========================= */
  useEffect(() => {
    if (!scene) return;

    bones.current = {
      root: scene.getObjectByName("mixamorigHips_01"),
      spine: scene.getObjectByName("mixamorigSpine_02"),
      spine1: scene.getObjectByName("mixamorigSpine1_03"),
      spine2: scene.getObjectByName("mixamorigSpine2_04"),
      neck: scene.getObjectByName("mixamorigNeck_05"),
      head: scene.getObjectByName("mixamorigHead_06"),

      leftUpperArm: scene.getObjectByName("mixamorigLeftArm_09"),
      leftLowerArm: scene.getObjectByName("mixamorigLeftForeArm_010"),
      leftHand: scene.getObjectByName("mixamorigLeftHand_011"),

      rightUpperArm: scene.getObjectByName("mixamorigRightArm_033"),
      rightLowerArm: scene.getObjectByName("mixamorigRightForeArm_034"),
      rightHand: scene.getObjectByName("mixamorigRightHand_035"),

      leftUpperLeg: scene.getObjectByName("mixamorigLeftUpLeg_056"),
      leftLowerLeg: scene.getObjectByName("mixamorigLeftLeg_057"),
      leftFoot: scene.getObjectByName("mixamorigLeftFoot_058"),

      rightUpperLeg: scene.getObjectByName("mixamorigRightUpLeg_061"),
      rightLowerLeg: scene.getObjectByName("mixamorigRightLeg_00"),
      rightFoot: scene.getObjectByName("mixamorigRightFoot_062"),
    };
  }, [scene]);

  /* =========================
     lookAt (world → local)
  ========================= */

  const lookAtBone = (bone, from, to, lerp = 0.6) => {
    if (!bone) return;

    const boneWorldPos = new THREE.Vector3();
    bone.getWorldPosition(boneWorldPos);

    const targetWorldPos = toV3(to);

    const m = new THREE.Matrix4().lookAt(
      boneWorldPos,
      targetWorldPos,
      new THREE.Vector3(0, 1, 0)
    );

    const worldQuat = new THREE.Quaternion().setFromRotationMatrix(m);

    if (bone.parent) {
      const parentWorldQuat = new THREE.Quaternion();
      bone.parent.getWorldQuaternion(parentWorldQuat).invert();
      worldQuat.premultiply(parentWorldQuat);
    }

    bone.quaternion.slerp(worldQuat, lerp);
  };

  /* =========================
     Frame
  ========================= */

  useFrame(() => {
    if (!poses?.length) return;

    const keypoints3D = poses[0].keypoints3D;
    if (!keypoints3D) return;

    const map = keypointsToMap(keypoints3D);
    const pose = normalizePose(map, POSE_SCALE);
    console.log(pose);
    const b = bones.current;

    const LH = pose.left_hip;
    const RH = pose.right_hip;
    const LK = pose.left_knee;
    const RK = pose.right_knee;
    const LA = pose.left_ankle;
    const RA = pose.right_ankle;
    const LHEEL = pose.left_heel;
    const RHEEL = pose.right_heel;

    const LS = pose.left_shoulder;
    const RS = pose.right_shoulder;
    const LE = pose.left_elbow;
    const RE = pose.right_elbow;
    const LW = pose.left_wrist;
    const RW = pose.right_wrist;

    const NECK = pose.neck;
    const NOSE = pose.nose;

    /* Root Y only */
    if (b.root && LHEEL && RHEEL) {
      if (baseRootY.current === null) baseRootY.current = b.root.position.y;
      b.root.position.y = baseRootY.current - Math.min(LHEEL.y, RHEEL.y);
    }

    /* Spine */
    if (LH && RH && LS && RS) {
      const hip = LH.clone().add(RH).multiplyScalar(0.5);
      const chest = LS.clone().add(RS).multiplyScalar(0.5);

      lookAtBone(b.spine, hip, chest, 0.2);
      lookAtBone(b.spine1, hip, chest, 0.3);
      lookAtBone(b.spine2, hip, chest, 0.4);
    }

    /* Head */
    if (b.head && NECK && NOSE) {
      lookAtBone(b.head, NECK, NOSE, 0.7);
    }

    /* Arms */
    if (LS && LE) lookAtBone(b.leftUpperArm, LS, LE, 0.7);
    if (LE && LW) lookAtBone(b.leftLowerArm, LE, LW, 0.7);
    if (LW) {
      const dir = LW.clone()
        .sub(LE || LS)
        .normalize();
      lookAtBone(b.leftHand, LW, LW.clone().add(dir), 0.6);
    }

    if (RS && RE) lookAtBone(b.rightUpperArm, RS, RE, 0.7);
    if (RE && RW) lookAtBone(b.rightLowerArm, RE, RW, 0.7);
    if (RW) {
      const dir = RW.clone()
        .sub(RE || RS)
        .normalize();
      lookAtBone(b.rightHand, RW, RW.clone().add(dir), 0.6);
    }

    /* Legs */
    if (LH && LK) lookAtBone(b.leftUpperLeg, LH, LK, 0.7);
    if (LK && LA) lookAtBone(b.leftLowerLeg, LK, LA, 0.7);
    if (b.leftFoot && LA && LHEEL) {
      lookAtBone(b.leftFoot, LA, LHEEL, 0.6);
    }

    if (RH && RK) lookAtBone(b.rightUpperLeg, RH, RK, 0.7);
    if (RK && RA) lookAtBone(b.rightLowerLeg, RK, RA, 0.7);
    if (b.rightFoot && RA && RHEEL) {
      lookAtBone(b.rightFoot, RA, RHEEL, 0.6);
    }
  });

  return <primitive object={scene} scale={[1, 1.5, 1]} />;
};

/* =========================
   Scene
========================= */

const Object3D = ({ poses }) => {
  if (!poses?.length) return null;

  return (
    <div style={{ width: 300, height: 400 }}>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} />

        <RiggedModel url="/y_bot.glb" poses={poses} />
        <Pose3D poses={poses} minScore={0.6} />

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Object3D;
