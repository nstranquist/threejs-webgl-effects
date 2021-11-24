// https://codesandbox.io/s/learn-with-jason-oep9o?file=/public/scene.glb
// https://codesandbox.io/s/learn-with-jason-oep9o

import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, useGLTF, OrbitControls, PerspectiveCamera, Stars, Html } from '@react-three/drei'
import styled from 'styled-components'
// import RocketModel from '../assets/models/rocket.glb'

// const GLB_URI = "https://codesandbox.io/s/learn-with-jason-oep9o?file=/public/scene.glb"
// const ROCKET_URI = "../assets/models/rocket.glb"
const BURGER_URI = "/burger.glb"

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: overlaps (https://sketchfab.com/overlaps)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/91964c1ce1a34c3985b6257441efa500
title: Space exploration [WLP series #8]
*/
function RocketModel({ url }) {
  const rocket = useGLTF(url)
  console.log('rocket:', rocket)
  // console.log('nodes:', nodes)
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={4}>
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh receiveShadow castShadow geometry={rocket.nodes.planet002.geometry} material={rocket.nodes.planet002.material} />
        <mesh geometry={rocket.nodes.planet003.geometry} material={rocket.nodes.planet003.material} />
      </group>
    </group>
  )
}

function BurgerModel({ url }) {
  const group = useRef()
  const { nodes, materials } = useGLTF(url) // '/burger.glb'
  console.log('burger nodes:', nodes)

  return (
    <group ref={group} rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={7} dispose={null}>
      <group position={[0, 0.15, 0]} scale={[1.03, 0.74, 1.03]} rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh geometry={nodes.Cylinder_1.geometry} material={materials.cheese} /> {/* materials['bread_outside._top.002']} /> */}
        <mesh geometry={nodes.Cylinder_2.geometry} material={materials.cheese} />
        <mesh geometry={nodes.Cylinder_3.geometry} material={materials.meat} />
        <mesh geometry={nodes.Cylinder_4.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Cylinder_5.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Cylinder_6.geometry} material={materials.side} />
        <mesh geometry={nodes.Cylinder_7.geometry} material={materials.onion_top} />
        <mesh geometry={nodes.Cylinder_8.geometry} material={materials.cheese} /> {/* materials['bread_outside._top'] */}
        <mesh geometry={nodes.Cylinder_9.geometry} material={nodes.Cylinder_9.material} />
        <mesh geometry={nodes.Cylinder_10.geometry} material={nodes.Cylinder_10.material} />
        <mesh geometry={nodes.Cylinder_11.geometry} material={nodes.Cylinder_11.material} />
      </group>
      <group position={[2.21, -0.94, 0.24]} rotation={[0.01, -0.63, 1.56]} scale={[0.6, 0.6, 0.48]}>
        <mesh geometry={nodes.Cube073.geometry} material={materials.fries} />
        <mesh geometry={nodes.Cube073_1.geometry} material={nodes.Cube073_1.material} />
        <mesh geometry={nodes.Cube073_2.geometry} material={nodes.Cube073_2.material} />
        <mesh geometry={nodes.Cube073_3.geometry} material={nodes.Cube073_3.material} />
      </group>
    </group>
  )
}

useGLTF.preload(BURGER_URI)


export default function RotatingRocket() {
  return (
    <StyledApp id="canvas-container">
      <div className="bg" />
      <h1>
        Learn <span style={{ fontSize: '0.4em' }}>with</span>
        <br />
        <span>Jason</span>
      </h1>
      <Canvas dpr={[1.5, 2]} linear shadows>
        {/* <fog attach="fog" args={['#272730', 16, 30]} /> */}
        <ambientLight intensity={0.75} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={75}>
          <pointLight intensity={1} position={[-10, -25, -10]} />
          <spotLight castShadow intensity={2.25} angle={0.2} penumbra={1} position={[-25, 20, -15]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
        </PerspectiveCamera>
        <Suspense fallback={<Html><p style={{color:"#fff"}}>Loading Model...</p></Html>}>
          {/* url="/scene.glb" */}
          {/* <RocketModel url={ROCKET_URI} /> */}
          <BurgerModel url={BURGER_URI} />
        </Suspense>
        <OrbitControls autoRotate enablePan={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Stars radius={500} depth={50} count={1000} factor={10} />
      </Canvas>
      <div className="layer" />
      <Loader />
      <a href="https://github.com/drcmda/learnwithjason" className="top-left" children="Github" />
      <a href="https://twitter.com/0xca0a" className="top-right" children="Twitter" />
      <a href="https://github.com/pmndrs/react-three-fiber" className="bottom-left" children="@react-three/fiber" />
    </StyledApp>
  )
}

const StyledApp = styled.div`
@import url('https://rsms.me/inter/inter.css');

html,
body,
#root,
.bg,
canvas {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background: #171717;
  font-family: 'Inter var', sans-serif;
}

.bg {
  position: absolute;
  background: radial-gradient(at 50% 100%, #873740 0%, #272730 40%, #171720 80%, #070710 100%);
}

h1 {
  position: absolute;
  top: 120px;
  left: 60px;
  font-weight: 900;
  font-size: 5em;
  margin: 0;
  color: peru;
  line-height: 0.6em;
  letter-spacing: -2px;
  text-align: left;
}

h1 > span {
  white-space: pre;
}

.layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(63, 12, 88, 0.25) 0%, transparent 100%);
  pointer-events: none;
}

span.header {
  font-weight: 700;
  position: absolute;
  display: inline-block;
  width: 500px;
  transform: translate3d(0, -50%, 0);
  font-size: 9em;
  line-height: 0.9em;
  pointer-events: none;
  top: 350px;
  left: 50px;
}

span.header-left {
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  position: absolute;
  display: inline-block;
  transform: translate3d(0, -50%, 0);
  line-height: 1em;
  top: 200px;
  left: 60px;
  font-size: 4em;
  width: 200px;
}

a {
  font-weight: 400;
  font-size: 14px;
  color: inherit;
  position: absolute;
  display: inline;
  text-decoration: none;
  z-index: 1;
  color: white;
}

a.top-left {
  top: 60px;
  left: 60px;
}

a.top-right {
  top: 60px;
  right: 60px;
}

a.bottom-left {
  bottom: 60px;
  left: 60px;
}

a.bottom-right {
  bottom: 60px;
  right: 60px;
}

`