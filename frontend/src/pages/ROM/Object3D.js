import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// import RiggedModel from "./RiggedModel";
import Pose3D from "../../components/Pose3D";
import App from "./test/App";

const Object3D = ({ poses }) => {
  if (!poses?.length) return null;

  return (
    <div style={{ width: 300, height: 400 }}>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} />
        {/* <RiggedModel url="/y_bot.glb" poses={poses} /> */}
        <Pose3D poses={poses} minScore={0.0} />

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Object3D;
