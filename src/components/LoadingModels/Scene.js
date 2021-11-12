import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const Scene = () => {
  const obj = useLoader(OBJLoader, '/models/Poimandres.obj');
  return <primitive object={obj} />
}
