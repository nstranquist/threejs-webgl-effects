import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Loader } from './LoaderUI'

const name = type => `/textures/metated-1_${type}.png`

export const Scene = () => {
  const [colorMap, displacementMap, normalMap, aoMap] = useLoader(TextureLoader, [
    name("color"),
    name("displacement"),
    name("normal"),
    name("ambient_occlusion")
  ])

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          displacementScale={0.2}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          // roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    </>
  )
}

const LoadingTextures = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Scene />
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default LoadingTextures