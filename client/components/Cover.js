import React from 'react'
import { Button, Image } from 'semantic-ui-react'

export default function Cover ({ gameState, setGameState, createCells, setGameTime }) {
  const getCanvasStyle = () => {
    let opacity = 1
    switch (gameState) {
      default:
      case 'ready':
      case 'started':
        break
      case 'game over':
        opacity = 0.9
        break
    }
    return { opacity: opacity }
  }

  const renderButton = () => {
    switch (gameState) {
      default:
      case 'ready':
        return null
      case 'started':
      case 'game over':
        return (<Button secondary style={{ marginTop: 100 }}
          onClick={() => {
            setGameState('started')
            createCells()
            setGameTime(0)
          }}>
      new game
        </Button>)
    }
  }

  const getImageUrl = () => {
    switch (gameState) {
      default:
      case 'ready':
        return null
      case 'game over':
        return 'gameover.jpeg'
    }
  }

  return (
    <div className='cover' style={getCanvasStyle()}>
      <Image src={getImageUrl()}/>
      {renderButton()}
    </div>
  )
}
