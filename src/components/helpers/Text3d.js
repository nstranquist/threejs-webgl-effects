import { useRef, useMemo, useLayoutEffect } from 'react'
import { useLoader, extend } from '@react-three/fiber'
// import { useReflow } from '@react-three/flex'
// import { useAspect, Html } from '@react-three/drei'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Vector3 } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'


export const defaultTextColor = "#FAC508";

const textScale = 0.075

extend({ TextGeometry })

export const Text3d = ({
  children,
  vAlign="top",
  hAlign="center", // "initial"
  size = 1,
  textColor = defaultTextColor,
  textSize = 40,
  textHeight = 100,
  ...props
}) => {
  // Can I reuse the loading for optimized performance? Is this already being done behind the scenes?
  const font = useLoader(FontLoader, "/fonts/Ranchers-Regular.json")
  const textMesh = useRef();

  // const reflow = useReflow();

  const config = useMemo(() => ({
    font,
    size: textSize,
    height: textHeight,
    curveSegments: 3, // can play around with
    bevelEnabled: true, // compare with/without bevel
    bevelSize: 1.1,
    bevelOffset: 0,
    bevelSegments: 1, // again, play around
  }), [font, textSize, textHeight])

  useLayoutEffect(() => {
    if(!textMesh.current) return;
    const objectSize = new Vector3();
    textMesh.current.geometry.computeBoundingBox();
    textMesh.current.geometry.boundingBox.getSize(objectSize)
    textMesh.current.position.x = hAlign === "center" ? -objectSize.x / 2 : hAlign === "right" ? 0 : -objectSize.x;
    textMesh.current.position.y = vAlign === -objectSize.y // 0; // "top" // "center" ? -objectSize.y / 2 : vAlign === "top" ? 0 : -objectSize.y;
    // textMesh.current.position.z = -10;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  return (
    <group {...props} scale={[textScale * size, textScale * size, textScale]}>
      <mesh ref={textMesh} castShadow receiveShadow>
        <textGeometry args={[children, config]} />
        <meshStandardMaterial color={textColor} />
      </mesh>
    </group>
  )
}

