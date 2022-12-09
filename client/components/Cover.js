import React from 'react'
import { Button, Image } from 'semantic-ui-react'

export default function Cover ({ gameState, setGameState, createCells, setGameTime }) {
  const getCanvasStyle = () => {
    let zIndex = 4
    let opacity = 1
    switch (gameState) {
      default:
      case 'ready':
        break
      case 'started':
        zIndex = -1
        break
      case 'game over':
        zIndex = 4
        opacity = 0.9
        break
    }
    return { zIndex: zIndex, opacity: opacity }
  }

  const renderButton = () => {
    switch (gameState) {
      default:
      case 'ready':
        return (<Button color='red'
          onClick={() => setGameState('started')}>
      Start
        </Button>)
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
        return null
      case 'ready':
        return 'Tetris.png'
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
