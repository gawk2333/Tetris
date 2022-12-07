import React, { useState } from 'react'
import Playground from './components/Playground'
import HeaderPannel from './components/HeaderPannel'
// import { connect } from 'react-redux'

const App = () => {
  const [gameState, setGameState] = useState('ready')
  const [keyPressNumber, setKeyPressNumber] = useState(0)
  const [keyCode, setKeyCode] = useState(null)
  const [score, setScore] = useState(0)

  const keyDownHandler = (e) => {
    e.preventDefault()
    if (e) {
      setKeyPressNumber(keyPressNumber + 1)
      setKeyCode(e.keyCode)
    }
  }

  const getKeyCode = () => {
    return keyCode
  }

  return (
    <div className='mainPage' onKeyDown={keyDownHandler}>
      <HeaderPannel gameState={gameState}
        setGameState={setGameState}
        score = {score}/>
      <Playground gameState = {gameState}
        setGameState={setGameState}
        score={score}
        setScore={setScore}
        getKeyCode={getKeyCode}
        keyPressNumber={keyPressNumber}/>
    </div>
  )
}

export default App
