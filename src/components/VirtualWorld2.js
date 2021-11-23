import { useState } from 'react'
import styled from 'styled-components'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'

// reference: https://www.youtube.com/watch?v=9ZEjSxDRIik

const VirtualWorld2 = () => {
  const [bgColor, setBgColor] = useState("black") // darkslategrey
  const [boxColor, setBoxColor] = useState("hotpink")
  const [planeColor, setPlaneColor] = useState("lightblue")

  return (
    <StyledVirtualWorld2 id="canvas-container" bgColor={bgColor}>
      <Canvas>
        <OrbitControls />
        {/* YOOO */}
        <Stars />
        {/* Need to add lights to show a box in color, not just black */}
        <ambientLight intensity={0.5} />
        {/* Add spot light to add some perspective */}
        <spotLight position={[10, 15, 10]} angle={0.3} />

        {/* Wrap all Components that we want in the Physics environment */}
        <Physics>
          <Box boxColor={boxColor} />
          <Plane planeColor={planeColor} />
        </Physics>
      </Canvas>
    </StyledVirtualWorld2>
  )
}

export default VirtualWorld2

function Box({
  boxColor = "hotpink"
}) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] })) // mass allows gravity to affect the object

  const handleBoxClick = () => {
    // makes the ball bounce up a little, each click
    api.velocity.set(0, 3, 0)
  }

  // Set box at position y=2 to place it above the Plane
  return (
    <mesh ref={ref} position={[0, 2, 0]} onClick={() => handleBoxClick()}> {/* can move the position props ( position={[0, 2, 0]} ) to the useBox() function, then just pass the ref */}
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={boxColor} />
    </mesh>
  )
}

function Plane({
  planeColor = "lightblue"
}) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))

  // Make plane lower than the box (0, 0, 0) in the x/y/z coords
  return (
    <mesh ref={ref} rotation={[-Math.PI, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[100, 100, 0]} />
      <meshLambertMaterial attach="material" color={planeColor} />
    </mesh>
  )
}

const StyledVirtualWorld2 = styled.div`
  background: ${props => props.bgColor};
`