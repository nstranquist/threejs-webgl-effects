import styled from 'styled-components'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Suspense, useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import state from './state'
import Plane from './Plane'
import { Block, useBlock } from './blocks'
import Diamonds from './diamonds'
import { Text, MultilineText } from './Text'

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

function Startup() {
  const ref = useRef();
  useFrame(() => (ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, 0, 0.025)))

  return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[200, 200, 1]} />
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#D40749" : "#2FE8C3"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 32, 32]} shift={75} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
        <Html
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          <div tabIndex={index}>{text}</div>
        </Html>
        <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
        <Block factor={0.2}>
          <Text opacity={0.5} size={w * 0.5} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1, -10]}>
            {"0" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}

function Content() {
  const images = useLoader(
    THREE.TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  
  useMemo(() => images.forEach((texture) => (texture.minFilter = THREE.LinearFilter)), [images])
  
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()

  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text left size={w * 0.15} position={[-w / 3.2, 0.5, -1]} color="#d40749">
            MOKSHA
          </Text>
        </Block>
        <Block factor={1.0}>
          <Html className="bottom-left" style={{ color: "white" }} position={[-canvasWidth / 2, -canvasHeight / 2, 0]}>
            It was the year 2076.{mobile ? <br /> : " "}The substance had arrived.
          </Html>
        </Block>
      </Block>
      <Block factor={1.2} offset={5.7}>
        <MultilineText top left size={w * 0.15} lineHeight={w / 5} position={[-w / 3.5, 0, -1]} color="#2fe8c3" text={"four\nzero\nzero"} />
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
        </Block>
      ))}
      <Block factor={1.25} offset={8}>
        <Html style={{ color: "white" }} className="bottom-left" position={[-canvasWidth / 2, -canvasHeight / 2, 0]}>
          Culture is not your friend.
        </Html>
      </Block>
    </>
  )
}

const StyledScrollRig = styled.div`
/* @import url("https://fonts.googleapis.com/css?family=Sulphur+Point&display=swap"); */

*,
*::after,
*::before {
  box-sizing: border-box;
}

:root {
  font-size: 20px;
}

::selection {
  background: #2ddab8;
  color: white;
}

body {
  margin: 0;
  padding: 0;
  background: #0c0f13;
  overflow: hidden;
  font-family: "Sulphur Point", sans-serif;
  color: #8b8b8b;
  font-size: 0.9rem;
}

a {
  color: #545454;
  text-decoration: none;
}

a:focus,
a:hover {
  color: #8b8b8b;
}

#root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.loading {
  padding: 10px;
  transform: translate3d(-50%, -50%, 0);
  color: #8b8b8b;
}

.scrollArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.frame {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 1.5rem;
  z-index: 2;
}

.frame__title {
  font-size: inherit;
  font-weight: normal;
  margin: 0;
}

.frame__links {
  margin: 1rem 0;
}

.frame__link:not(:last-child) {
  margin-right: 1rem;
}

.frame__nav .frame__link:first-child {
  margin-right: 1.5rem;
}

.bottom-left {
  padding: 1.5rem;
  transform: translate3d(0, -100%, 0) !important;
}

.canvas > div {
  z-index: 10000000;
}

#root > div > div {
  pointer-events: none;
}

@media screen and (min-width: 53em) {
  body {
    overflow: hidden;
  }
  .frame {
    display: grid;
    height: 100vh;
    padding: 2rem 3.7rem;
    pointer-events: none;
    align-content: space-between;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "title links"
      "... ..."
      "... nav";
  }
  .frame__title {
    grid-area: title;
  }
  .frame__links {
    grid-area: links;
    justify-self: end;
    margin: 0;
  }
  .frame__link {
    pointer-events: auto;
  }
  .frame__nav {
    grid-area: nav;
    justify-self: end;
  }
  .bottom-left {
    padding: 0 0 2rem 3.7rem;
  }
}

`