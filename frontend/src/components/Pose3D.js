import React from "react";
import { Sphere, Line } from "@react-three/drei";

const Pose3D = ({ poses, filterByScore = true, minScore = 0.3 }) => {
  if (!poses || poses.length === 0) return null;

  const keypoints = poses[0].keypoints3D || poses[0].keypoints;
  const adjacentPairs = [
    // 얼굴
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [5, 6],
    [0, 7],
    [0, 8],
    [9, 10],

    // 상체
    [11, 12], // 어깨
    [11, 13],
    [13, 15],
    [15, 17],
    [15, 19],
    [15, 21], // 왼팔
    [12, 14],
    [14, 16],
    [16, 18],
    [16, 20],
    [16, 22], // 오른팔

    [11, 23],
    [12, 24], // 어깨 -> 엉덩이
    [23, 24], // 골반

    // 하체
    [23, 25],
    [25, 27],
    [27, 29],
    [29, 31], // 왼다리
    [24, 26],
    [26, 28],
    [28, 30],
    [30, 32], // 오른다리
  ];

  const isVisible = (kp) => {
    if (!kp || kp.x == null || kp.y == null || kp.z == null) return false;
    if (filterByScore) return kp.score > minScore;
    return true;
  };

  return (
    <>
      {/* Keypoints */}
      {keypoints.map((kp, i) =>
        isVisible(kp) ? (
          <Sphere key={i} args={[0.02, 16, 16]} position={[-kp.x, -kp.y, kp.z]}>
            <meshStandardMaterial color="red" />
          </Sphere>
        ) : null
      )}
      {/* Skeleton Lines */}
      {adjacentPairs.map(([i, j], idx) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (isVisible(kp1) && isVisible(kp2)) {
          return (
            <Line
              key={idx}
              points={[
                [-kp1.x, -kp1.y, kp1.z],
                [-kp2.x, -kp2.y, kp2.z],
              ]}
              color="lime"
              lineWidth={2}
            />
          );
        }
        return null;
      })}
      {/* X, Y, Z axes */}
      <Line
        points={[
          [0, 0, 0],
          [1, 0, 0],
        ]}
        color="red"
        lineWidth={2}
      />{" "}
      {/* X축 */}
      <Line
        points={[
          [0, 0, 0],
          [0, 1, 0],
        ]}
        color="green"
        lineWidth={2}
      />{" "}
      {/* Y축 */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, 1],
        ]}
        color="blue"
        lineWidth={2}
      />{" "}
      {/* Z축 */}
    </>
  );
};

export default Pose3D;
