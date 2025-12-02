import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Pose3D from "../../components/Pose3D";
const Object3D = ({ poses }) => {
  if (!poses || poses.length === 0) return null;
  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
        <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} />
          <Pose3D poses={poses} minScore={0} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};
export default Object3D;
