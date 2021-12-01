import styled from 'styled-components'
import { useRef, useEffect, Suspense, useMemo, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber'
import { Stars, Html, Text, useAspect } from '@react-three/drei'
import { Flex, Box, useReflow } from '@react-three/flex'
import { MathUtils, Vector3 } from 'three'
import { Text3d } from './helpers/Text3d'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import { landingSections as sections/*, landingState as state*/ } from '../data/landing'

const state = {
  top: 0,
  pages: 0,
  numberSections: 6
}

const defaultTextColor = "#FAC508"
const textScale = 0.075
const defaultBoxScale = 1.5


const NicoScroll1 = () => {
  const scrollArea = useRef();
  const scroll = useRef(0);

  // const onScroll = e => {
  //   state.top = e.target.scrollTop
  // }

  const handleScroll = e => {
    return scroll.current = e.target.scrollTop / (e.target.clientHeight)
  }

  // useEffect(() => {
  //   onScroll({ target: scrollArea.current })
  // }, [])

  const onCanvasCreated = state => {
    return state.events.connect(scrollArea.current)
  }

  return (
    <Styled id="canvas-container">
      {/* <div className="canvas-inner-container"> */}
        <Canvas
          concurrent
          onCreated={onCanvasCreated}
          raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}
          // camera={{ position: [0, 25, 150]}}
        >
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 100, 400]} intensity={0.1} />
          <spotLight position={[100, 100, 100]}
            penumbra={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Effects */}
          <Stars />

          {/* Scene */}
          <Suspense fallback={<Html center><h2 style={{color:"#fff",background:"#000",margin:0,fontWeight:400}}>Loading scene...</h2></Html>}>
            <ScrollContainer scroll={scroll}>
              <Scene />
            </ScrollContainer>
          </Suspense>
        </Canvas>
      {/* </div> */}

      <div className="canvas-scroll-area" ref={scrollArea} onScroll={handleScroll}>
        {/* {sections.map((section, index) => (
          <div key={`section-${index}-${section.id}`} style={{height: `100vh` }} id={section.id} />
        ))} */}
        <div style={{height: `${sections.length * 100}vh`, pointerEvents: "none"}} />
      </div>
    </Styled>
  )
}

const ScrollContainer = ({
  scroll,
  children,
  ...rest
}) => {
  const { viewport } = useThree();
  const group = useRef();

  const vector = new Vector3();
  useFrame((state, delta) => {
    // group.current.position.y = MathUtils.damp(group.current.position.y, viewport.height * scroll.current, 4, delta)
    group.current.position.lerp(vector.set(0, viewport.height * scroll.current, 0), 0.1)
  })
  
  return (
    <group ref={group}>{children}</group>
  )
}

const Scene = ({
  onScroll,
  ...rest
}) => {
  const groupRef = useRef();
  // const reflow = useReflow();
  // const viewport = useThree(threeState => threeState.viewport)
  const { size } = useThree()
  const [viewportHeight, viewportWidth] = useAspect(size.width, size.height, 1)
  const textMesh = useRef();

  // useFrame(() => {
  //   if(!groupRef.current) return;
  //   groupRef.current.position.lerp(new Vector3([0, state.top, 0]))

  //   reflow();
  // })

  // const textOptions = {
  //   font,
  //   size: 10,
  //   height: 1
  // };

  return (
    <group ref={groupRef}>
      <Flex
        flexDirection="column"
        size={[viewportHeight, viewportWidth, 0]}
        height="100%"
        width="100%"
      >
        {/* Section */}
        {sections.map((section, index) => (
          <Box
            key={`box-section-${index}`}
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            width="100%"
            position={[0, -viewportHeight * index, 0]}
          >
            {/* Section Title */}
            <Box flexDirection="row" height="10%" width="100%">
              {/* <mesh receiveShadow castShadow>
                HELLO
                <textBufferGeometry />
              </mesh> */}
              {/* Text Mesh */}
              {/* <mesh position={[0, 0, -10]} ref={mesh}>
                <textGeometry attach='geometry' args={['three.js', textOptions]} />
                <meshBasicMaterial attach='material' />
              </mesh> */}
              {/* <Text3d textSize={12} size={0.1}>{section.name}</Text3d> */}
              <Html position={[0, 0, 0]} center style={{color:defaultTextColor, fontSize:"4rem",fontFamily:"Ranchers",fontWeight:"bold"}}>{section.name}</Html>
            </Box>
            <Box flexGrow={1} flex={1} height="90%" width="100%">
              <TextBox color="#fff" textColor="#000" boxScale={2}>{section.name}</TextBox>
            </Box>
          </Box>
        ))}
        {/* <Box flexDirection="column" height="100%" width="100%">
          <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial color="#fff" />
          </mesh>
        </Box> */}
        {/* <Box flexDirection="column" height="100%" width="100%">
          <Text color="#fff" fontSize={12} anchorX="center" anchorY="center">Hello</Text>
        </Box>
        <Box>
          <mesh>
            Hello
            <textGeometry attach="geometry" />
          </mesh>
        </Box> */}
      </Flex>
    </group>
  )
}

const TextThreeD = ({
  textColor = defaultTextColor,
  textSize = 40,
  textHeight = 100,
  color,
  children,
  vAlign="top",
  hAlign="center", // "initial"
  size = 1,
  center=true,
  ...rest
}) => {
  const font = useLoader(FontLoader, "/fonts/Ranchers-Regular.json")
  const textMesh = useRef();

  const textConfig = useMemo(() => ({
    font,
    size: textSize,
    height: textHeight,
    curveSegments: 32, // can play around with
    bevelEnabled: true, // compare with/without bevel
    bevelSize: 1.2,
    bevelOffset: 0,
    bevelSegments: 4, // again, play around
  }), [font, textSize, textHeight])

  useLayoutEffect(() => {
    if(!textMesh.current) return;
    const objectSize = new Vector3();
    textMesh.current.geometry.computeBoundingBox();
    textMesh.current.geometry.boundingBox.getSize(objectSize)
    // textMesh.current.position.x = hAlign === "center" ? -objectSize.x / 2 : hAlign === "right" ? 0 : -objectSize.x;
    // textMesh.current.position.y = vAlign === -objectSize.y // 0; // "top" // "center" ? -objectSize.y / 2 : vAlign === "top" ? 0 : -objectSize.y;
    // textMesh.current.position.z = -10;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  // <group {...props} scale={[textScale * size, textScale * size, textScale]}>

  return (
    <mesh ref={textMesh} castShadow receiveShadow scale={[0.05, 0.05, 0.05]}>
      <textGeometry args={[children, textConfig]} />
      <meshStandardMaterial color={textColor} />
    </mesh>
  )
}

const Styled = styled.div`
  background: #000;
  color: #fff;
  /* overflow: hidden; */

  /* .canvas-inner-container {
    position: absolute;
    height: 100vh;
    width: 100%;
    z-index: 3;
    background: transparent
  } */

  .canvas-scroll-area {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    top: 0;
    left: 0;
    /* z-index: 1; */
  }
`
export default NicoScroll1;

const TextBox = ({
  children,
  boxScale = defaultBoxScale,
  color="#fff",
  textColor="#000",
  ...props
}) => {

  return (
    <mesh receiveShadow castShadow>
      <boxGeometry args={[boxScale, boxScale, boxScale]} />
      {/* <boxBufferGeometry attach="geometry" color="#fff" /> */}
      <meshPhongMaterial color={color} />
      {/* Insert Text */}
      <Html position={[0, 0, 1]} className="canvas-label" center style={{color: textColor}}>
        {children}
      </Html>

      {/* <Text3d size={12} position={[0, -viewportHeight * index, -150]}>{section.name}</Text3d> */}

      {/* Recreate 3D Text Locally */}
      {/* <TextThreeD textSize={12}>{section.name}</TextThreeD> */}

    </mesh>
  )
}