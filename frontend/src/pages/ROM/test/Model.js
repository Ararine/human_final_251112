import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Model({ pose = {}, scale = 1.5 }) {
  const { scene } = useGLTF("/y_bot.glb");

  // 🔥 진짜 기본 pose 저장소
  const basePoseRef = useRef({});

  // 1️⃣ 최초 1회: GLB의 "원래 회전값" 저장
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isBone) {
        basePoseRef.current[obj.name] = {
          x: obj.rotation.x,
          y: obj.rotation.y,
          z: obj.rotation.z,
        };
      }
    });
  }, [scene]);

  // 2️⃣ 기본값 + 내가 준 값 (offset)
  useEffect(() => {
    Object.entries(pose).forEach(([boneName, rot]) => {
      const bone = scene.getObjectByName(boneName);
      const base = basePoseRef.current[boneName];
      if (!bone || !base) return;

      bone.rotation.x = base.x + (rot.x ?? 0);
      bone.rotation.y = base.y + (rot.y ?? 0);
      bone.rotation.z = base.z + (rot.z ?? 0);
    });
  }, [scene, pose]);
  useEffect(() => {
    console.group("🦴 Bone List (Base Pose)");
    scene.traverse((obj) => {
      if (obj.isBone) {
        const rot = {
          x: obj.rotation.x,
          y: obj.rotation.y,
          z: obj.rotation.z,
        };

        basePoseRef.current[obj.name] = rot;

        console.log(obj.name, rot);
      }
    });
    console.groupEnd();
  }, [scene]);
  return <primitive object={scene} scale={scale} />;
}

useGLTF.preload("/y_bot.glb");
