import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics, usePlane, useSphere, useBox } from '@react-three/cannon'
import { RepeatWrapping } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useInterval } from './hooks/useInterval'
import * as textures from './textures'

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
          <Cube position={[0, 1, 0]} type="wood" />
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
  // grassTexture.repeat.set(100, 100) // commenting this out makes the grass repeat indefinitely

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

const Cube = ({
  position,
  type,
  ...props
}) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position: position,
    ...props
  }))

  return (
    <mesh castShadow ref={ref}>
      {/* Loop to render all 6 sides of cubes */}
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial attachArray="material" map={textures[type]} key={index} />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}
