import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import styled from 'styled-components'

export const SolTedCard = () => {

  return (
    <StyledCardContainer id="canvas-container">
      <Canvas>
        <ambientLight />
        <spotLight />

        <Card />

        <OrbitControls />
      </Canvas>
    </StyledCardContainer>
  )
}

const Card = () => {
  // const [ref] = use

  return (
    <mesh>

    </mesh>
  )
}

const StyledCardContainer = styled.div`

`