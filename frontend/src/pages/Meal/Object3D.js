import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Pose3D from "../../components/Pose3D";
const Object3D = () => {
  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} />
          <Pose3D poses={poses} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};
export default Object3D;
