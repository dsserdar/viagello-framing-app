import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PictureFrame from "./PictureFrame";
import { AppConfig } from "../../types";

interface SceneProps {
  config: AppConfig;
}

export default function Scene({ config }: SceneProps) {
  return (
    <Canvas id="three-canvas" gl={{ preserveDrawingBuffer: true }} shadows camera={{ position: [0, 0, 9], fov: 50 }}>
      <ambientLight intensity={0.5} />
      
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
      <directionalLight position={[0, 0, 5]} intensity={0.6} />

      <pointLight position={[-5, 2, 3]} intensity={1.5} color="#ffffff" /> 
      <pointLight position={[5, 2, 3]} intensity={1.5} color="#ffffff" />  
      <pointLight position={[0, 6, 2]} intensity={1.0} color="#ffffff" />  
      <pointLight position={[0, -6, 2]} intensity={1.0} color="#ffffff" /> 
      
      <PictureFrame config={config} />

      <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} minAzimuthAngle={-Math.PI / 4} maxAzimuthAngle={Math.PI / 4} />
    </Canvas>
  );
}