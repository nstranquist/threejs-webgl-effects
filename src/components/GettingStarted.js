import { Canvas } from '@react-three/fiber'

const GettingStarted = () => {

  return (
    <div id="canvas-container">
      {/* "Canvas" sets up a Scene and a Camera behind the scenes. It renders the scene every frame, no render loop required */}
      <Canvas>
        {/* "mesh" is needed to see anything. equivalent to 'new THREE.Mesh()' */}
        {/* - it is a basic scene object in three.js, used to hold geometry and material for 3D space */}
        <mesh>
          <boxGeometry /> {/* args={[2,2,2]}  for width, length, depth */}
          <meshStandardMaterial />
        </mesh>

        {/* Add ambient lights to Canvas */}
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0,0,5]} />
      </Canvas>
    </div>
  )
}

export default GettingStarted;