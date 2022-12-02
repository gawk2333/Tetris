import React, { useState } from 'react'
import Playground from './components/Playground'
import HeaderPannel from './components/HeaderPannel'
// import { connect } from 'react-redux'

const App = () => {
  const [gameState, setGameState] = useState('ready')
  const [keyPressNumber, setKeyPressNumber] = useState(0)
  const [keyCode, setKeyCode] = useState(null)

  const keyDownHandler = (e) => {
    e.preventDefault()
    if (e) {
      console.log(e.keyCode)
      setKeyPressNumber(keyPressNumber + 1)
      setKeyCode(e.keyCode)
    }
  }

  const getKeyCode = () => {
    return keyCode
  }

  return (
    <div onKeyDown={keyDownHandler}>
      <HeaderPannel gameState={gameState}
        setGameState={setGameState} />
      <Playground gameState = {gameState}
        getKeyCode={getKeyCode}
        keyPressNumber={keyPressNumber}/>
    </div>
  )
}

export default App
