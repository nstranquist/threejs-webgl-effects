import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react"
import styled from 'styled-components'
import * as THREE from 'three'
import { useLocation, Switch, Route } from "wouter"
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Loader, useTexture, useGLTF, Shadow, Html } from "@react-three/drei"
import { a } from "@react-spring/three"
import { useTransition, useSpring } from "@react-spring/core"
import DistortionMaterial from "./distortionMaterial"
import { Container, Jumbo, Nav, Box, Line, Cover } from "./Styles"
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import HdrFile from "../../assets/other/photo_studio_01_1k.hdr";


// Note: File imports not working for HDR and GLB.
// Tried Potential Fix: https://github.com/mrdoob/three.js/issues/18642, doesn't work
// Assets loaded after loading in sprites from public/


// https://codesandbox.io/s/router-transitions-4j2q2?file=/src/App.js

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)
const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)
const material1 = new DistortionMaterial()
const material2 = new DistortionMaterial()
const material3 = new DistortionMaterial()
const jumbo = {
  "/": ["The sun", "is its father."],
  "/knot": ["The moon", "its mother."],
  "/bomb-torus": ["The wind", "hath carried it", "in its belly."],
}

const TexturesArray = [
  "/assets/sprites/RouterTransitions/ao.jpeg",
  "/assets/sprites/RouterTransitions/normal.jpeg",
  "/assets/sprites/RouterTransitions/height.png",
  "/assets/sprites/RouterTransitions/roughness.jpeg"
]

const RouterTransitions = () => {
  // Current route
  const [location] = useLocation()
  // Animated background color
  const props = useSpring({
    background: location === "/" ? "white" : location === "/knot" ? "#272730" : "#ffcc6d",
    color: location === "/" ? "black" : location === "/knot" ? "white" : "white",
  })
  // Animated shape props
  const transition = useTransition(location, {
    from: { position: [0, 0, -20], rotation: [0, Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [0, 0, -10], rotation: [0, -Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    config: () => (n) => n === "opacity" && { friction: 60 },
  })

  return (
    <StyledRouterTransitions id="canvas-container">
      <Container style={{ ...props }}>
        <Jumbo>
          {transition((style, location) => (
            <Text open={true} t={style.t} opacity={style.opacity} background={props.background} children={jumbo[location]} />
          ))}
        </Jumbo>
      </Container>
      <Canvas concurrent camera={{ position: [0, 0, 20], fov: 50 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}>
        <spotLight position={[0, 30, 40]} />
        <spotLight position={[-50, 30, 40]} />
        <Suspense fallback={<Html>Loading...</Html>}>
          {/* Scene and Stuff */}
          <Shapes transition={transition} />
          <Environment files="../../assets/other/photo_studio_01_1k.hdr" path="../../assets/other/" />
        </Suspense>
      </Canvas>
      <Nav style={{ color: props.color }} />
      <Loader />
    </StyledRouterTransitions>
  )
}

export default RouterTransitions;

function Text({ children, opacity, background }) {
  return (
    <Box style={{ opacity }}>
      {React.Children.toArray(children).map((text, index) => (
        <Line key={index} style={{ transform: opacity.to((t) => `translate3d(0,${index * -50 + (1 - t) * ((1 + index) * 40)}px,0)`) }}>
          <div>{text}</div>
          <Cover style={{ background, transform: opacity.to((t) => `translate3d(0,${t * 100}%,0) rotateZ(-10deg)`) }} />
        </Line>
      ))}
    </Box>
  )
}

function Shapes({ transition }) {

  // const { nodes } = useGLTF("../../assets/models/bomb-gp.glb")

  const textures = useTexture(TexturesArray)

  useLayoutEffect(() => {
    textures.forEach((texture) => ((texture.wrapT = texture.wrapS = THREE.RepeatWrapping), texture.repeat.set(4, 4)))
  }, [textures])

  return transition(({ opacity, ...props }, location) => (
    <a.group {...props}>
      <Switch location={location}>
        <Route path="/">
          <Shape geometry={torus} material={material1} textures={textures} color="white" opacity={opacity} />
        </Route>
        <Route path="/knot">
          <Shape geometry={torusknot} material={material2} textures={textures} color="#272730" opacity={opacity} />
        </Route>
        <Route path="/bomb-torus">
          <Shape
            // geometry={nodes.Little_Boy_Little_Boy_Material_0.geometry}
            geometry={torus}
            material={material3}
            textures={textures}
            scale={[0.7, 0.7, 0.7]}
            rotation={[0, 0.5, 0]}
            shadowScale={[17, 2.5, 1]}
            color="black"
            opacity={opacity}
          />
        </Route>
      </Switch>
    </a.group>
  ))
}

function Shape({ geometry, material, args, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {
  const ref = useRef()
  const { mouse, clock } = useThree()
  const [ao, normal, height, roughness] = textures

  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])

  useFrame(() => {
    if (ref.current) {
      rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
      ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
      ref.current.material.time = clock.getElapsedTime() * 3
    }
  })

  return (
    <group {...props}>
      <a.mesh
        ref={ref}
        args={args}
        geometry={geometry}
        material={material}
        material-color={color}
        material-aoMap={ao}
        material-normalMap={normal}
        material-displacementMap={height}
        material-roughnessMap={roughness}
        material-opacity={opacity}>
        <Shadow opacity={0.2} scale={shadowScale} position={[0, -8.5, 0]} />
      </a.mesh>
    </group>
  )
}

const StyledRouterTransitions = styled.div`
@import url("https://rsms.me/inter/inter.css");

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
}

body {
  font-family: "Inter", sans-serif;
}

#root {
  background: white;
  background: radial-gradient(ellipse at -200% 60%, rgba(209, 209, 209, 0.48) 22%, rgba(182, 182, 182, 0) 71%),
    linear-gradient(160deg, rgb(233, 233, 233), hsl(0, 0%, 100%) 100%);
  overflow: auto;
}

body {
  position: fixed;
  overflow: hidden;
  overscroll-behavior-y: none;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
}

a {
  pointer-events: all;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  margin-left: 20px;
}

`