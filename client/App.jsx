import React, { useState } from 'react'
import Playground from './components/Playground'
import HeaderPannel from './components/HeaderPannel'
// import { connect } from 'react-redux'

const App = () => {
  const [gameState, setGameState] = useState('ready')
  return (
    <div>
      <HeaderPannel gameState={gameState} setGameState={setGameState}/>
      <Playground gameState = {gameState}/>
    </div>
  )
}

export default App
