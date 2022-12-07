import React from 'react'
import { Button } from 'semantic-ui-react'

export default function Cover ({ gameState, setGameState }) {
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
        opacity = 0.5
        break
    }
    return { zIndex: zIndex, opacity: opacity }
  }

  return (
    <div className='cover' style={getCanvasStyle()}>
      { gameState === 'ready'
        ? (<Button primary style={{ marginTop: 100 }}
          onClick={() => setGameState('started')}>
      Start
        </Button>)
        : (<Button secondary style={{ marginTop: 100 }}
          onClick={() => setGameState('ready')}>
      Pause
        </Button>) }
    </div>
  )
}
