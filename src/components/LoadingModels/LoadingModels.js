import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Model } from './Model'
import { Loader } from '../LoaderUI'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { Scene } from './Scene'
// import 3d model from resources


const LoadingModels = () => {


  return (
    <div id="canvas-container">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Model />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense> 
      </Canvas>
    </div>
  )
}

export default LoadingModels