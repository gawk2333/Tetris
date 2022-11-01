import React from 'react'
import { Button } from 'semantic-ui-react'

export default function HeaderPannel ({ gameState, setGameState }) {
  return (
    <div style={{ margin: '0 auto' }}>
      {gameState === 'ready'
        ? (<Button primary onClick={() => setGameState('started')}>Start</Button>)
        : (<Button secondary onClick={() => setGameState('ready')}>Pause</Button>)}
    </div>
  )
}
