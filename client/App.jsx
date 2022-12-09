import React, { useRef, useEffect, useState } from 'react'
import Playground from './components/Playground'
import HeaderPannel from './components/HeaderPannel'
import GamePad from './components/GamePad'
import isMobile from './utils/isMobile'
// import { connect } from 'react-redux'

const App = () => {
  const [gameState, setGameState] = useState('ready')
  const [keyPressNumber, setKeyPressNumber] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [keyCode, setKeyCode] = useState(null)
  const [score, setScore] = useState(0)
  const mobile = isMobile()
  const keydownRef = useRef(null)

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
      console.log(keydownRef)
      if (keydownRef) {
        console.log(keydownRef)
        keydownRef.current.focus()
      }
      setTimeout(() => setGameTime(gameTime + 1), 1000)
    }
  }, [gameState, gameTime])

  return (
    <div
      className='mainPage'
      tabIndex={0}
      onKeyDown={keyDownHandler}
      ref={keydownRef}
    >
      <HeaderPannel
        gameTime={gameTime}
        score = {score}/>
      <Playground
        gameState = {gameState}
        setGameState={setGameState}
        gameTime={gameTime}
        setGameTime = {setGameTime}
        score={score}
        setScore={setScore}
        getKeyCode={getKeyCode}
        keyPressNumber={keyPressNumber}/>
      {mobile &&
     <GamePad
       keyPressNumber={keyPressNumber}
       setKeyPressNumber={setKeyPressNumber}
       setKeyCode = {setKeyCode}
     />}
    </div>
  )
}

export default App
