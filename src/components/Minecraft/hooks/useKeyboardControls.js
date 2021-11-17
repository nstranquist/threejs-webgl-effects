import { useState, useEffect } from 'react'
import { useStore } from './useStore'

// make mapping between the key code and the action
export function actionByKey(key) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump"
  }
  return keys[key]
}

export function textureByKey(key) {
  const keys = {
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    Digit5: 'log'
  }
  return keys[key]
}

// create hook
export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    "moveForward": false,
    "moveBackward": false,
    "moveLeft": false,
    "moveRight": false,
    "jump": false,
  })
  const setTexture = useStore(state => state.setTexture)

  useEffect(() => {
    const handleKeyDown = e => {
      if(actionByKey(e.code) && movement[actionByKey(e.code)] !== true) {
        // means we did click movement key
        setMovement(state => ({
          ...state,
          [actionByKey(e.code)]: true
        }))
      }
      if(textureByKey(e.code)) {
        setTexture(textureByKey(e.code))
      }
    }
    const handleKeyUp = e => {
      if(actionByKey(e.code) && movement[actionByKey(e.code)] !== false) {
        setMovement(state => ({
          ...state,
          [actionByKey(e.code)]: false
        }))
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  return movement;
}