import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'

const SpringAnimations = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <RotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  )
}

export default SpringAnimations

export const RotatingBox = () => {
  const myMesh = useRef();
  const [active, setActive] = useState(false);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  })

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </animated.mesh>
  )
}