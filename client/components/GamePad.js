import React from 'react'
import { Button } from 'semantic-ui-react'
import getWindowDimentions from '../utils/getWindowDimensions'

export default function GamePad ({
  keyPressNumber,
  setKeyPressNumber,
  setKeyCode
}) {
  const { windowWidth, windowHeight } = getWindowDimentions()

  const getGamepadBottom = () => {
    const gamepadBottom = (windowHeight - 213 - 1.2 * windowWidth) / 2
    if (gamepadBottom > 0) {
      return gamepadBottom
    } else {
      return 0
    }
  }

  const onVirtualKeyClicked = (keyCode) => {
    setKeyPressNumber(keyPressNumber + 1)
    setKeyCode(keyCode)
  }

  return (
    <div className='gamepad'
      style={{
        width: 168,
        height: 112,
        position: 'absolute',
        left: (windowWidth - 168) / 2,
        bottom: getGamepadBottom(),
        zIndex: 6,
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      <div className='gamepadkey'></div>
      <Button
        onClick={() => onVirtualKeyClicked(38)}
        color='orange'
        icon='arrow circle up'
        style={{
          width: 56,
          height: 56,
          margin: 0,
          padding: 0,
          opacity: 0.5,
          zIndex: 6
        }}/>
      <div className='gamepadkey'></div>
      <Button
        onClick={() => onVirtualKeyClicked(37)}
        color='orange'
        icon='arrow circle left'
        style={{
          width: 56,
          height: 56,
          margin: 0,
          padding: 0,
          opacity: 0.5,
          zIndex: 6
        }}/>
      <Button
        onClick={() => onVirtualKeyClicked(40)}
        color='orange'
        icon='arrow circle down'
        style={{
          width: 56,
          height: 56,
          margin: 0,
          padding: 0,
          opacity: 0.5,
          zIndex: 6
        }}/>
      <Button
        onClick={() => onVirtualKeyClicked(39)}
        color='orange'
        icon='arrow circle right'
        style={{
          width: 56,
          height: 56,
          margin: 0,
          padding: 0,
          opacity: 0.5,
          zIndex: 6
        }}/>

    </div>
  )
}
