import styled from 'styled-components'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Suspense, useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

export const ScrollRig = () => {
  const scrollArea = useRef();

  const onScroll = e => {
    state.top.current = e.target.scrollTop
  }

  useEffect(() => {
    onScroll({ target: scrollArea.current })
  }, [])

  return (
    <StyledScrollRig>
      <Canvas linear dpr={[1, 2]} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500]}}>
        <Suspense fallback={<Html center className="fallback-text">Loading...</Html>}>
          <Content />
          <Diamonds />
          <Startup />
        </Suspense>
      </Canvas>

      <div id="scroll-container" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{height: `${(state.pages / state.sections) * 100}vh`}} />
        ))}
      </div>
    </StyledScrollRig>
  )
}

const StyledScrollRig = styled.div`

`