import * as THREE from "three";

/**
 * keypoints 안전 접근
 */
export function get(obj, key, fallback = null) {
  if (!obj) return fallback;
  return obj[key] ?? fallback;
}

/**
 * 세 점으로 관절 굽힘 각도 (elbow, knee)
 * return: radians
 */
export function angleAtJoint(a, b, c) {
  if (!a || !b || !c) return 0;

  const ba = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z).normalize();

  const bc = new THREE.Vector3(c.x - b.x, c.y - b.y, c.z - b.z).normalize();

  const dot = THREE.MathUtils.clamp(ba.dot(bc), -1, 1);
  return Math.acos(dot);
}

/**
 * 방향 벡터 → pitch / roll
 * (현재 코드에서는 안 쓰지만 복구)
 */
export function directionToPitchRoll(dir) {
  if (!dir) return { pitch: 0, roll: 0 };

  const d = new THREE.Vector3(dir.x, dir.y, dir.z).normalize();

  const pitch = Math.atan2(d.y, Math.sqrt(d.x * d.x + d.z * d.z));
  const roll = Math.atan2(d.x, d.z);

  return { pitch, roll };
}

/**
 * 관절 Euler 계산
 *
 * parent -> joint -> child
 * reference : 좌/우 기준점 (yaw 안정화용)
 *
 * return { pitch, roll, yaw }
 */
export function jointEulerFromPoints(parent, joint, child, reference = null) {
  if (!parent || !joint || !child) {
    return { pitch: 0, roll: 0, yaw: 0 };
  }

  const p = new THREE.Vector3(parent.x, parent.y, parent.z);
  const j = new THREE.Vector3(joint.x, joint.y, joint.z);
  const c = new THREE.Vector3(child.x, child.y, child.z);

  // bone direction (joint → child)
  const dir = new THREE.Vector3().subVectors(c, j).normalize();

  // pitch (앞/뒤)
  const pitch = Math.atan2(dir.y, Math.sqrt(dir.x * dir.x + dir.z * dir.z));

  // roll (기울기)
  const roll = Math.atan2(dir.x, dir.y);

  let yaw = 0;

  // yaw 안정화 (좌/우 기준 reference 사용)
  if (reference) {
    const r = new THREE.Vector3(reference.x, reference.y, reference.z);

    const side = new THREE.Vector3().subVectors(r, p).normalize();

    const forward = new THREE.Vector3(dir.x, 0, dir.z).normalize();
    const right = new THREE.Vector3().crossVectors(
      new THREE.Vector3(0, 1, 0),
      forward
    );

    yaw = Math.atan2(right.dot(side), forward.dot(side));
  }

  return { pitch, roll, yaw };
}
