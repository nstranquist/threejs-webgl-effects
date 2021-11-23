import { Canvas, useLoader } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
// import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Suspense, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

export const SpaceTed = () => {
  // const soltedRef = useRef();

  // HEY: SEE THIS FOR NOTES ON HOW TO DO THIS:
  // https://codeworkshop.dev/blog/2020-06-14-creating-a-skybox-with-reflections-in-react-three-fiber/

  return (
    <StyledContainer id="canvas-container">
      {/* <div className="content-container">
        <div style={{minHeight: "300vh"}} />
      </div> */}
      <div className="canvas-scroll-container">
      <Canvas>
        <Suspense fallback={<Html><p style={{color:"#fff"}}>loading...</p></Html>}>
          <Stars />

          <TedMesh />
        </Suspense>
      </Canvas>
      </div>
    </StyledContainer>
  )
}

function TedMesh() {
  const soltedMap = useLoader(TextureLoader, "/metateds/solted-base.png")

  return (
    <mesh>
      <meshBasicMaterial map={soltedMap} />
      <planeBufferGeometry />
    </mesh>
  )
}

const StyledContainer = styled.div`
  background: #000;
  min-height: 100vh;
  width: 100%;

  .content-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .canvas-scroll-container {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  }
`