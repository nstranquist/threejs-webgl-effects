import { Suspense, useRef, useState, forwardRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Plane, useAspect, Html } from '@react-three/drei'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import Fireflies from "./Fireflies"
// resources
import bgUrl from "../../assets/sprites/SpriteAs3D/bg.jpeg"
import starsUrl from "../../assets/sprites/SpriteAs3D/stars.png"
import groundUrl from "../../assets/sprites/SpriteAs3D/ground.png"
import bearUrl from "../../assets/sprites/SpriteAs3D/bear.png"
import leaves1Url from "../../assets/sprites/SpriteAs3D/leaves1.png"
import leaves2Url from "../../assets/sprites/SpriteAs3D/leaves2.png"
import "./layerMaterial"

import { BlendFunction } from 'postprocessing'

// https://codesandbox.io/s/xgjtc
// https://github.com/spite/THREE.MeshLine
// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures

// fix #100: replace 0.21 in 'useAspect()' with 1 to fix the scale. A lot of these libraries had to be adapted

const SpriteAs3D = () => {
  const dof = useRef()

  return (
    <StyledSprite3D id="canvas-container">
      <Canvas
        orthographic
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, alpha: false, depth: false }}
        camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 0 }}>
          <ambientLight intensity={0.1} />
        <Suspense fallback={<Html>Loading...</Html>}>
          <Scene dof={dof} />
        </Suspense>
        <Effects ref={dof} />
      </Canvas>

      <div className="main">
        <div className="code">
          <div className="code-container">
            <span>code here</span>
          </div>
        </div>
        <a href="https://github.com/drcmda/zustand" className="top-right" children="Github" />
        <a href="https://twitter.com/0xca0a" className="bottom-right" children="Twitter" />
        <a
          href="https://www.instagram.com/tina.henschel/"
          className="bottom-left"
          children="Illustrations @ Tina Henschel"
        />
        <span className="header-left">Zustand</span>
      </div>
    </StyledSprite3D>
  )
}

export default SpriteAs3D

const Effects = forwardRef((props, ref) => {
  const {
    viewport: { width, height },
  } = useThree()

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField ref={ref} bokehScale={4} focalLength={0.1} focusDistance={1} width={width / 2} height={height / 2} />
      <Vignette offset={0.5} darkness={0.5} eskil={false} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  )
})


function Scene({ dof }) {
  const scaleN = useAspect(1600, 1000, 1)
  const scaleW = useAspect(2200, 1000, 1)
  const textures = useLoader(TextureLoader, [bgUrl, starsUrl, groundUrl, bearUrl, leaves1Url, leaves2Url])
  const subject = useRef()
  const group = useRef()
  const layersRef = useRef([])
  const [movementVector] = useState(() => new THREE.Vector3())
  const [tempVector] = useState(() => new THREE.Vector3())
  const [focusVector] = useState(() => new THREE.Vector3())
  console.log('textures:', textures)
  const layers = [
    { texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
    { texture: textures[1], z: 10, factor: 0.005, scale: scaleW },
    { texture: textures[2], z: 20, scale: scaleW },
    { texture: textures[3], z: 30, ref: subject, scaleFactor: 0.83, scale: scaleN },
    { texture: textures[4], factor: 0.03, scaleFactor: 1, z: 40, wiggle: 0.24, scale: scaleW },
    { texture: textures[5], factor: 0.04, scaleFactor: 1.3, z: 49, wiggle: 0.3, scale: scaleW },
  ]
  console.log('layers:', layers)

  useFrame((state, delta) => {
    dof.current.target = focusVector.lerp(subject.current.position, 0.05)
    movementVector.lerp(tempVector.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 2, 0.2)
    layersRef.current[4].uniforms.time.value = layersRef.current[5].uniforms.time.value += delta
  }, 1)

  return (
    <group ref={group}>
      {/* <Fireflies count={10} radius={80} colors={["orange"]} /> */}
      {layers.map(({ scale, texture, ref, factor = 0, scaleFactor = 1, wiggle = 0, z }, i) => (
        <Plane scale={scale} args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]} position-z={z} key={i} ref={ref}>
          <layerMaterial
            attach="material"
            movementVector={movementVector}
            textr={texture}
            factor={factor}
            ref={(el) => (layersRef.current[i] = el)}
            wiggle={wiggle}
            scaleFactor={scaleFactor}
          />
        </Plane>
      ))}
    </group>
  )
}


const StyledSprite3D = styled.div`
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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
  background: #010101;
}

#root {
  overflow: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
    segoe ui, arial, sans-serif;
}

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  pointer-events: none;
}

.main > div {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg {
  background-image: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/DWLR-bg.jpg");
}

.stars {
  background-image: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/OiNX-stars.png");
}

.ground {
  background-image: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/xyC5-ground.png");
}

.code {
  position: relative;
  margin-left: -140px;
  left: 50%;
  width: 50% !important;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-container {
  position: absolute;
}

.counter {
  position: absolute;
  top: -100px;
  right: -40px;
  color: white;
  background: #394a52;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 16px 40px -5px rgba(0, 0, 0, 0.5);
  width: 120px;
  height: 120px;
  font-size: 3em;
  z-index: 20000;
  pointer-events: all;
}

.counter > span {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -10px;
  transform: translate3d(-50%, -50%, 0);
}

.counter > button {
  margin: 10px;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  border-radius: 5px;
  border: solid 2px white;
  outline: none;
  background: transparent;
  color: white;
  cursor: pointer;
}

.bear {
  top: 12.5%;
  height: 80% !important;
  min-height: 600px;
  left: -19%;
  background-size: 1000px !important;
  background-image: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/TiR4-bear.png");
}

.leaves1 {
  left: -2.5%;
  top: -2.5%;
  width: 105% !important;
  height: 105% !important;
  background-image: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/zjhf-leaves1.png");
}

.leaves2 {
  left: -2.5%;
  top: -2.5%;
  width: 105% !important;
  height: 105% !important;
  background-image: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/3n-p-leaves2.png");
}

code {
  margin-top: -50px;
  display: inline-block;
  width: auto !important;
  padding: 40px 50px 40px 45px !important;
  font-size: 0.8em;
  border-radius: 10px !important;
  box-shadow: 0 16px 40px -5px rgba(0, 0, 0, 0.5);
}

span.header-left {
  font-weight: 700;
  text-transform: uppercase;
  position: absolute;
  display: inline-block;
  top: 40px;
  left: 40px;
  font-size: 3em;
  color: white;
}

@media only screen and (max-width: 1200px) {
  .bear {
    left: -20%;
  }
}

@media only screen and (max-width: 1140px) {
  .bear {
    left: -25%;
  }
}

@media only screen and (max-width: 1024px) {
  .bear {
    left: -20%;
  }
  .code {
    justify-content: center;
    width: 100% !important;
    left: 0;
    z-index: 1000;
    margin-left: 0;
  }
  code {
    font-size: 0.8em;
  }
}

@media only screen and (max-width: 600px) {
  code {
    font-size: 0.6em;
  }
}

a {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
    segoe ui, arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: inherit;
  position: absolute;
  display: inline;
  text-decoration: none;
  z-index: 1;
  pointer-events: all;
}

a.top-left {
  font-size: 0.8em;
  top: 90px;
  left: 40px;
}

a.top-right {
  top: 40px;
  right: 40px;
}

a.bottom-left {
  bottom: 40px;
  left: 40px;
}

a.bottom-right {
  bottom: 40px;
  right: 40px;
}

@media only screen and (max-width: 500px) {
  code {
    font-size: 0.4em;
  }
  span.header-left {
    top: 20px;
    left: 20px;
  }
  a.top-left {
    top: 70px;
    left: 20px;
  }

  a.top-right {
    top: 20px;
    right: 20px;
  }

  a.bottom-left {
    bottom: 20px;
    left: 20px;
  }

  a.bottom-right {
    bottom: 20px;
    right: 20px;
  }
}

`
