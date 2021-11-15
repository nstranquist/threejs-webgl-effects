import { useState } from 'react'
import styled from 'styled-components'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export const VirtualWorld2 = () => {
  const [bgColor, setBgColor] = useState("darkslategrey")

  return (
    <StyledVirtualWorld2 id="canvas-container" bgColor={bgColor}>
      <Canvas>
        <OrbitControls />
        {/* Need to add lights to show a box in color, not just black */}
        <ambientLight />
        {/* Add spot light to add some perspective */}
        <spotLight position={[10, 15, 10]}  />
        <Box />
      </Canvas>
    </StyledVirtualWorld2>
  )
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

const StyledVirtualWorld2 = styled.div`
  background: ${props => props.bgColor};
`