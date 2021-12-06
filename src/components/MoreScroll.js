import { Suspense, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, Plane, Html, useAspect, useScroll } from '@react-three/drei'
import * as THREE from 'three'

const pages = {
  numberOfPages: 4,
  content: [
    {
      name: "Metateds",
      id: "metateds",
      images: [""]
    },
    {
      name: "Family",
      id: "family",
      images: [""]
    },
    {
      name: "Rarities",
      id: 'rarities',
    },
    {
      name: "Tweam",
      id: "team"
    }
  ]
}

const MoreScroll = () => {

  return (
    <MoreScrollStyled id="canvas-container">
      <Canvas>
        <ambientLight />
        <pointLight />
        
        <Suspense fallback={<Html center>Loading...</Html>}>
          <ScrollContainer />
        </Suspense>
      </Canvas>

      {/* Navbar, outside of the canvas */}
      <nav style={{position:'fixed',right: 0,top: 120,display:'flex',flexDirection:'column'}}>
        {pages.content.map((pageContent, index) => {
          return (
            <a key={`nav-link-${index}`} href={`#${pageContent.id}`} style={{textDecoration:'none',margin:5}}>
              {pageContent.name}
            </a>
          )
        })}
      </nav>
    </MoreScrollStyled>
  )
}

const ScrollContainer = (props) => {
  const { size } = useThree();
  const [viewportHeight, viewportWidth] = useAspect(size.width, size.height, 1)

  return (
    <ScrollControls
      pages={pages.numberOfPages}
      // defaults:
      distance={1}
      damping={4}
      horizontal={false}
      infinite={false}
    >
      {/* Map Pages (or objects) */}
      <Scroll>
        <MyPlane args={[2,2]} position={[0,0,0]} />
        <MyPlane args={[2,2]} position={[0, viewportHeight, 0]} />
        <MyPlane args={[2,2]} position={[0, viewportHeight * 1, 0]} />
        <MyPlane args={[2,2]} position={[0, viewportHeight * 2, 0]} />
      </Scroll>

      <Scroll html>
        {pages.content.map((pageContent, index) => {
          return (
            <div key={`page-html-${index}`} style={{position:'absolute', top:`${100 * index}vh`}} id={pageContent.id}>
              <h1>{pageContent.name}</h1>
            </div>
          )
        })}
      </Scroll>
    </ScrollControls>
  )
}

const MyPlane = ({
  position,
  args,
  color = "#ddd",
  src=undefined,
  ...props
}) => {
  // const scrollRef = useRef();
  const planeRef = useRef();
  const scrollData = useScroll();

  useFrame(() => {
    console.log('scrollData:', scrollData)
  })

  return (
    <Plane ref={planeRef} args={args} position={position} color={color}>
      {/* Optional overrides */}
    </Plane>
  )
}

export default MoreScroll;

const MoreScrollStyled = styled.div`

`