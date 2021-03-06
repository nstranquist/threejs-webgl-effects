import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import styled from 'styled-components'
import { MathUtils, Vector3 } from 'three'

const state = {
  numberBoxes: 5,
  boxes: [
    {
      text: <span>This is some HTML</span>,
      color: "aquamarine"
    },
    {
      text: <h1>MetaTeds Caption</h1>,
      color: "yellow"
    },
    {
      text: <h1>Space is the best theme</h1>,
      color: "aquamarine"
    },
    {
      text: <h1>MetaTeds are Bringing the Metaverse!</h1>,
      color: "aquamarine"
    },
    {
      text: <h1>Wormhole MetaTed next february!</h1>,
      color: "aquamarine"
    },
  ]
}

const ScrollBoxes = () => {
  const scrollRef = useRef();
  const scroll = useRef(0);

  const handleScroll = e => {
    return scroll.current = e.target.scrollTop / (e.target.clientHeight)
  }

  const onCanvasCreated = state => {
    return state.events.connect(scrollRef.current);
  }

  return (
    <StyledScrollBoxes id="canvas-container">
      <Canvas
        onCreated={onCanvasCreated}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}
      >
        <ambientLight />
        <pointLight position={[10, 0, 10]} />

        <Suspense fallback={<Html center style={{background:"#000",color:"#fff"}}>Loading...</Html>}>
          <ScrollContainer scroll={scroll}>
            <Scene />
          </ScrollContainer>
        </Suspense>
      </Canvas>

      <div
        ref={scrollRef}
        id="scroll-container"
        onScroll={handleScroll}
      >
        <div style={{height: `${state.numberBoxes * 100}vh`, pointerEvents: "none"}} />
      </div>
    </StyledScrollBoxes>
  )
}

export default ScrollBoxes;

const StyledScrollBoxes = styled.div`
  #scroll-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    top: 0;
    left: 0;
  }
  .canvas-label {
    pointer-events: none;
    line-height: 2;
  }
  h1 {
    font-size: 3em;
    letter-spacing: -3px;
    line-height: 1.2;
  }
`

const ScrollContainer = ({
  scroll,
  children,
  ...rest
}) => {
  const { viewport } = useThree();
  const group = useRef();

  useFrame((state, delta) => {
    group.current.position.y = MathUtils.damp(group.current.position.y, viewport.height * scroll.current, 4, delta)
    // Or: group.current.position.lerp(vec.set(0, viewport.height * scroll.current, 0), 0.1)
  })
  
  return (
    <group ref={group}>{children}</group>
  )
}

const Scene = () => {
  const viewport = useThree(state => state.viewport)

  return (
    <>
      {state.boxes.map((box, index) => (
        <Box key={`${box.color}-${index}`} text={box.text} color={box.color} position={[0, -viewport.height * index, 0]} />
      ))}
      {/* <Box text={} color="" position={[0, -viewport.height, 0]} /> */}
    </>
  )
}

const Box = ({
  text,
  color,
  position,
  ...rest
}) => {
  const [hovered, set] = useState(false)

  return (
    <mesh {...rest} position={position} onPointerOver={(e) => set(true)} onPointerOut={(e) => set(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? "hotpink" : color} />
      <Html position={[0, 0, 1]} className="canvas-label" center>
        {text}
      </Html>
    </mesh>
  )
}