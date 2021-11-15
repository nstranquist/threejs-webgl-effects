import create from 'zustand'

const LOCAL_STORAGE_KEY = "world"

// get saved world from local storage (if it exists) and set it to the initial state
const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  cubes: getLocalStorage(LOCAL_STORAGE_KEY) || [{position: [0,0,0], type: "wood"}],
  addCube: (x, y, z, type) => {
    set(state => ({
      cubes: [...state.cubes, {pos: [x,y,z], type}],
    }))
  },
  removeCube: (x, y, z) => {
    set(state => ({
      ...state, // do i need to do this? maybe just return the cubes difference
      cubes: state.cubes.filter(cube => cube.x !== x || cube.y !== y || cube.z !== z) // filter out cube if all 3 coordinates match
    }))
  },
  texture: "wood", // store the active texture
  setTexture: (type) => {
    set(state => ({ texture: type }))
  },
  saveWorld: () => {
    set(state => setLocalStorage(LOCAL_STORAGE_KEY, state.cubes))
  }
}))