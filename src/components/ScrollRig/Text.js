import { FontLoader, Vector3, MathUtils } from "three"
// import * as THREE from 'three'
import { useCallback, useRef } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
// import { useAsset } from "use-asset"
import state from "./state"

export const Text = ({
  children,
  size=1,
  left,
  right,
  top,
  bottom,
  color = "white",
  opacity = 1,
  height = 0.01,
  layers = 0,
  font="/fonts/moonget-heavy",
  ...props
}) => {
  const data = useLoader(FontLoader, font)
  // const geom = useAsset(() => {
  //   return new Promise((res) => {
  //     return res(new THREE.TextBufferGeometry(children, {
  //       font: data,
  //       size: 1,
  //       height,
  //       curveSegments: 32
  //     }))
  //   })
  // }, [children])

  const onUpdate = useCallback(
    (self) => {
      const box = new Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(box)
      self.position.x = left ? 0 : right ? -box.x : -box.x / 2
      self.position.y = top ? 0 : bottom ? -box.y : -box.y / 2
    },
    [left, right, top, bottom]
  )

  const ref = useRef()

  let last = state.top.current

  useFrame(() => {
    ref.current.shift = MathUtils.lerp(ref.current.shift, (state.top.current - last) / 100, 0.1)
  })

  return (
    <group {...props} scale={[size, size, 0.1]}>
      <mesh onUpdate={onUpdate} frustumCulled={false}>
        <customMaterial ref={ref} color={color} transparent opacity={opacity} />
        <textBufferGeometry font={data} size={1} height={height} curveSegments={32} />
      </mesh>
    </group>
  )
}

export const MultilineText = ({
  text,
  size = 1,
  lineHeight = 1,
  position = [0, 0, 0],
  ...props
}) => {
  return text
    .split("\n")
    .map((text, index) => (
      <Text key={index} size={size} {...props} position={[position[0], position[1] - index * lineHeight, position[2]]} children={text} />
    ))
}