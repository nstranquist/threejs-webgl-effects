import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef } from 'react'

const Tutorial1 = () => {
  const [active, setActive] = useState(false)
  const [color, setColor] = useState("royalblue")
  const meshRef = useRef();

  const turnRed = () => {
    setColor("red")
  }

  const turnBlue = () => {
    setColor("royalblue")
  }

  

  return (
    <div id="canvas-container">
      <Canvas>
        <MyMesh meshRef={meshRef} active={active} setActive={setActive} turnRed={turnRed} turnBlue={turnBlue} color={color} />
        
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
}

export default Tutorial1

// refactored the mesh here so that it is a child of Canvas, and can use the 'useFrame()'
const MyMesh = ({
  meshRef,
  active,
  setActive,
  turnRed,
  turnBlue,
  color
}) => {


  // make square rotate
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    meshRef.current.rotation.x = a;
  });

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={turnRed}
      onPointerOut={turnBlue}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color={color} />
    </mesh>
  )
}