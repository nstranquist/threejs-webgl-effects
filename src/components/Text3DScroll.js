import styled from 'styled-components'
import { Suspense, useMemo, useEffect, useRef, useLayoutEffect } from "react"
import * as THREE from 'three'
import { Canvas, useLoader, useThree, useFrame, extend } from '@react-three/fiber'
import { useAspect, Html } from "@react-three/drei"
import { Flex, Box, useReflow } from "@react-three/flex"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const state = {
  top: 0,
  pages: 2
}

const data = [
  "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
]

extend({ TextGeometry })

const Text3DScroll = () => {
  const scrollArea = useRef()
  const onScroll = (e) => (state.top = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <StyledApp id="canvas-container">
      <Canvas
        concurrent
        noEvents
        colorManagement
        shadowMap
        onPointerMove={null}
        camera={{ position: [0, 50, 250] }}
      >
        <pointLight position={[0, 100, 400]} intensity={0.1} />
        <ambientLight intensity={0.1} />
        <spotLight
          position={[100, 100, 100]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html center>loading...</Html>}>
          <Grid />
        </Suspense>
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </StyledApp>
  )
}

function Image({ i = 0, r = 0, url, ...rest }) {
  const reflow = useReflow();
  r = useMemo(() => r || Math.round(Math.random() * 100), [])
  const texture = useLoader(THREE.TextureLoader, url)
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (i > 0 && i % 10 === 0) {
      groupRef.current.scale.x = 1 + Math.sin(clock.getElapsedTime()) * 0.8
      // Inform flexbox (replacing 'invalidate()')
      reflow();
    }
  })
  return (
    <group ref={groupRef} {...rest}>
      <mesh position={[0, 0, 10]} castShadow receiveShadow>
        <boxBufferGeometry args={[50 + r, 50, 50]} />
        <meshStandardMaterial map={texture} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Images() {
  return data.map((url, i) => (
    <Box width="auto" height="auto" flexGrow={1} key={url} margin={10}>
      <Image i={i} url={url} />
    </Box>
  ))
}

function Grid() {
  const group = useRef()
  const { size } = useThree()
  const [vpWidth] = useAspect(size.width, size.height, 1)
  const vec = new THREE.Vector3()
  useFrame(() => group.current.position.lerp(vec.set(0, state.top, 0), 0.1))
  return (
    <group ref={group}>
      <Flex
        mainAxis="x"
        crossAxis="y"
        flexDirection="row"
        flexWrap="wrap"
        justify="center"
        //justify="space-between"
        alignItems="center"
        size={[vpWidth, 0, 0]}>
        <Images />
        <Box>
          <Text margin={10} size={15}>REACT</Text>
        </Box>
        <Images />
        <Box>
          <Text margin={10} size={15}>THREE</Text>
        </Box>
        <Images />
        <Box>
          <Text margin={10} size={15}>FIBER</Text>
        </Box>
      </Flex>
    </group>
  )
}

function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1,
  color = "#000000",
  ...props
}) {
  const font = useLoader(FontLoader, "/fonts/bold.blob") // "/bold.blob" // can't use '.ttf' or it will error out // Ranchers-Regular.json
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 200,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 1.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  )
  const mesh = useRef()

  useLayoutEffect(() => {
    const temp_size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(temp_size)
    mesh.current.position.x = hAlign === "center" ? -temp_size.x / 2 : hAlign === "right" ? 0 : -temp_size.x
    mesh.current.position.y = vAlign === "center" ? -temp_size.y / 2 : vAlign === "top" ? 0 : -temp_size.y
  }, [children])

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh} castShadow receiveShadow>
        <textGeometry args={[children, config]} />
        <meshStandardMaterial color="aquamarine" />
      </mesh>
    </group>
  )
}

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: white;

  background: #272730;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
    segoe ui, arial, sans-serif;

.scrollArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

`

export default Text3DScroll