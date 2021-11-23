import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import { EffectComposer, Outline } from '@react-three/postprocessing'


const BoxOutlines = () => {
  const [hovered, onHover] = useState(null)
  const selected = hovered ? [hovered] : undefined

  return (
    <div id="canvas-container" style={{background: "#202020"}}>
      <Canvas dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Box onHover={onHover} position={[-1, 0, 0]} />
        <Box onHover={onHover} position={[1, 0, 0]} />

        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default BoxOutlines;

const Box = ({
  onHover,
  // handleBoxClick,
  ...rest
}) => {
  const box = useRef();

  useFrame((state, delta) => {
    box.current.rotation.x = box.current.rotation.y += delta
  })

  const onPointerOver = e => onHover(box)
  const onPointerOut = e => onHover(null)

  const onBoxClick = e => {
    console.log('not implemented yet')
  }

  return (
    <mesh ref={box} {...rest} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onBoxClick}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}