import { forwardRef, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils } from 'three'
import "./CustomMaterial"
import { useBlock } from "./blocks"
import state from "./state"

const Plane = forwardRef(({ color = "white", shift = 1, opacity = 1, args, map, ...props }, ref) => {
  const { viewportHeight, offsetFactor } = useBlock()
  const material = useRef()

  let last = state.top.current

  useFrame(() => {
    const { pages, top } = state
    material.current.scale = MathUtils.lerp(material.current.scale, offsetFactor - top.current / ((pages - 1) * viewportHeight), 0.1)
    material.current.shift = MathUtils.lerp(material.current.shift, ((top.current - last) / shift) * 1.5, 0.1)
    last = top.current
  })

  return (
    <mesh ref={ref} {...props}>
      <planeBufferGeometry args={args} />
      <customMaterial ref={material} color={color} map={map} transparent opacity={opacity} />
    </mesh>
  )
})

export default Plane
