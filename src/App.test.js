import ReactThreeTestRenderer from '@react-three/test-renderer'
import { RotatingBox } from './components/SpringAnimations'

test('mesh to have two children', async () => {
  const renderer = await ReactThreeTestRenderer.create(<RotatingBox />)

  const mesh = renderer.scene.children[0].allChildren

  expect(mesh.length).toBe(2)
})

test('click event makes box bigger', async () => {
  const renderer = await ReactThreeTestRenderer.create(<RotatingBox />)

  const mesh = renderer.scene.children[0]

  await renderer.fireEvent(mesh, 'click')

  expect(mesh.props.scale).toBe(1.5)
})
