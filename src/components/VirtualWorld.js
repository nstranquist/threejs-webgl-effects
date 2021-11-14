import niceColors from 'nice-color-palettes';
import * as THREE from 'three'
import { Box, Plane } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import styled from 'styled-components'

// reference: https://www.section.io/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/

export const VirtualWorld = () => {


  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}>
        {/*
          // Set gravity
          // All items we want to see the effect of gravity on them shall be inside the Physics tags
          // These include the planes and boxes and any other models
          // Four planes are created which shall hold the contents as a platform
        */}
        <Physics gravity={[0, -10, 0]}>
          <PhyPlane
              color={niceColors[17][5]}
              position={[0, -2, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
          />
          <PhyPlane color={niceColors[17][2]} position={[0, 0, -10]} />
          <PhyPlane color={niceColors[17][3]} position={[-6, 0, -10]} rotation={[0, 2, 0]} />
          <PhyPlane color={niceColors[17][1]} position={[6, 0, -10]} rotation={[0, -2, 0]} />

          {/* // Three objects are placed in different positions in the x, y, and z axis */}
          <PhyBox position={[2, 0, -5]} />
          <PhyBox position={[0, 0, -5]} />
          <PhyBox position={[-2, 0, -5]} />
        </Physics>

        {/* // This is for provision of ambient lighting in the scene */}
        <ambientLight intensity={0.3} />

        {/* // We have added some pointLight here at the position showed */}
        <pointLight intensity={0.8} position={[5, 0, 5]} />

        {/* // Apart from ambient light and point light, you can add others such as fog */}
      </Canvas>
    </div>
  )
}

const StyledVirtualWorld = styled.div`

`

// It allows you to input a color as an argument
// The material used will have been built by a mesh material
// Remember, you can still add other attributes in the object created
// We won't add it's mass since itwill begin to fall
function PhyPlane({ color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
      <Plane args={[1000, 1000]} ref={ref}>
        <meshStandardMaterial color={color} />
      </Plane>
  );
}

// It has a mass so that it will always be under a gravitational effect to fall
// We have put in some trigger events which will cause some action to occur; that is on-click
// They shall be built out of a mesh material
function PhyBox(props) {
  const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));

  return (
      <Box
          args={[1, 1, 1]}
          ref={ref}
          onClick={() =>

              // This shoots the object when clicked on
              api.applyImpulse([0, 5, -10], [0, 0, 0])

              // can try something different
              // api.applyImpulse([0, 5, -10], [1, 1, 1])
              // &&

              // This makes the object fly upwards when clicked on

              // api.velocity.set(0, 2, 0)

          }
      >
        <meshNormalMaterial />
      </Box>
  );
}