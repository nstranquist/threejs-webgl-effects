import { useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { RepeatWrapping } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const Minecraft = () => {

  return (
    <div id="canvas-container">
      <Canvas shadowMap sRGB>
        {/* Canvas Stuff */}
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground position={[0, 0.5, 0]} />
          <Player position={[0, 3, 10]} />
        </Physics>
      </Canvas>
    </div>
  )
}

const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props}))
  const grassTexture = useLoader(TextureLoader, '/images/grass.jpg')
  grassTexture.wrapS = RepeatWrapping
  grassTexture.wrapT = RepeatWrapping
  // grassTexture.repeat.set(100, 100)

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={grassTexture}  />
    </mesh>
  )
}

const Player = (props) => {
  const { camera } = useThree()
  const [ref] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic', // dynamic makes it react to gravity
    ...props
  }))

  // move camera to player position on every frame
  useFrame(() => {
    camera.position.copy(ref.current.position)
  });

  return (
    <mesh ref={ref}>

    </mesh>
  )
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef()
  useEffect(() => {
    savedCallback.current = callback;
  })
  useEffect(() => {
    function tick() {
      if(typeof savedCallback?.current !== 'undefined') {
        savedCallback.current();
      }
    }
    if(delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id);
    }
  }, [delay])
}