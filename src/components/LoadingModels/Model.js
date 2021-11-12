import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

const models = [ "/models/CargoFreighter.gltf", "/models/Poimandres.gltf" ]

export const Model = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF(models[0])

  useEffect(() => {
    console.log("nodes:", nodes)
    console.log("materials:", materials)
  }, [nodes, materials])

  return (
    <group ref={group} {...props} dispose={null} scale={0.4}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry} // {nodes.Curve007_1.geometry}
        material={materials['LowPolyColours']} // {materials['Material.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_1.geometry} // {nodes.Curve007_2.geometry}
        material={materials['LowPolyGlow']} // {materials['Material.002']}
      />
    </group>
  )
}

useGLTF.preload(models[0])