import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics, usePlane, useSphere, useBox } from '@react-three/cannon'
import { RepeatWrapping, Vector3 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useInterval } from './hooks/useInterval'
import * as textures from './textures'
import { useKeyboardControls } from './hooks/useKeyboardControls'
import { useRef, useEffect } from 'react'

const SPEED = 6

const Minecraft = () => {

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

export default Minecraft

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
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic', // dynamic makes it react to gravity
    ...props
  }))
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls();
  const velocity = useRef([0,0,0])
  useEffect(() => {
    api.velocity.subscribe(v => (velocity.current = v))
  }, [api.velocity])

  // move camera to player position on every frame
  useFrame(() => {
    camera.position.copy(ref.current.position)
    const direction = new Vector3();
    const frontVector = new Vector3(0,0,(moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize() // make length 1(?)
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
  });

  return (
    <>
      <mesh ref={ref} />
      {/* FPVControls */}
    </>
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
