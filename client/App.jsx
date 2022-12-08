import React, { useEffect, useState } from 'react'
import Playground from './components/Playground'
import HeaderPannel from './components/HeaderPannel'
// import { connect } from 'react-redux'

const App = () => {
  const [gameState, setGameState] = useState('ready')
  const [keyPressNumber, setKeyPressNumber] = useState(0)
  const [gameTime, setGameTime] = useState(0)
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

  useEffect(() => {
    if (gameState === 'started') {
      setTimeout(() => setGameTime(gameTime + 1), 1000)
    }
  }, [gameState, gameTime])

  return (
    <div className='mainPage' onKeyDown={keyDownHandler}>
      <HeaderPannel
        gameTime={gameTime}
        score = {score}/>
      <Playground gameState = {gameState}
        setGameState={setGameState}
        gameTime={gameTime}
        score={score}
        setScore={setScore}
        getKeyCode={getKeyCode}
        keyPressNumber={keyPressNumber}/>
    </div>
  )
}

export default App
