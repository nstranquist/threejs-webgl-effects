import styled from 'styled-components'
import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'

// https://codesandbox.io/s/useintersect-and-scrollcontrols-gsm1y

function Item({ url, scale, ...props }) {
  const visible = useRef(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
  })
  return (
    <group {...props}>
      <Image ref={ref} scale={scale} url={url} />
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)
  return (
    <Scroll>
      <Item url="/scroll/2-intersect/1.jpeg" scale={[w / 3, w / 3, 1]} position={[-w / 6, 0, 0]} />
      <Item url="/scroll/2-intersect/2.jpeg" scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item url="/scroll/2-intersect/3.jpeg" scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url="/scroll/2-intersect/4.jpeg" scale={[w / 5, w / 5, 1]} position={[w / 4, -h * 1.2, 0]} />
      <Item url="/scroll/2-intersect/5.jpeg" scale={[w / 5, w / 5, 1]} position={[w / 10, -h * 1.75, 0]} />
      <Item url="/scroll/2-intersect/6.jpeg" scale={[w / 3, w / 3, 1]} position={[-w / 4, -h * 2, 0]} />
      <Item url="/scroll/2-intersect/7.jpeg" scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url="/scroll/2-intersect/8.jpeg" scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url="/scroll/2-intersect/12.jpeg" scale={[w / 2.5, w / 2, 1]} position={[-w / 6, -h * 4.1, 0]} />
    </Scroll>
  )
}

const ScrollIntersect = () => (
  <StyledApp id="canvas-container">
    <Canvas orthographic camera={{ zoom: 80 }} gl={{ alpha: false, antialias: false, stencil: false, depth: false }} dpr={[1, 1.5]}>
      <color attach="background" args={['#f0f0f0']} />
      <ScrollControls damping={6} pages={5}>
        <Items />
        <Scroll html style={{ width: '100%' }}>
          <h1 style={{ position: 'absolute', top: `100vh`, right: '20vw', fontSize: '25em', transform: `translate3d(0,-100%,0)` }}>all</h1>
          <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>hail</h1>
          <h1 style={{ position: 'absolute', top: '260vh', right: '10vw' }}>thee,</h1>
          <h1 style={{ position: 'absolute', top: '350vh', left: '10vw' }}>thoth</h1>
          <h1 style={{ position: 'absolute', top: '450vh', right: '10vw' }}>
            her
            <br />
            mes.
          </h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  </StyledApp>
)

export default ScrollIntersect

const StyledApp = styled.div`
@import url('https://rsms.me/inter/inter.css');
@supports (font-variation-settings: normal) {
  html {
    font-family: 'Inter var', sans-serif;
  }
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  overscroll-behavior: none;
  background: #f0f0f0;
  color: black;
  font-family: 'Inter var', sans-serif;
  font-feature-settings: 'cv06' 1;
}

h1 {
  font-size: 15vw;
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 0.7em;
  margin: 0;
  padding: 0;
}

a {
  pointer-events: all;
  color: black;
  text-decoration: none;
}

svg {
  fill: black;
}

`