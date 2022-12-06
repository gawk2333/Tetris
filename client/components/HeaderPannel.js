import React from 'react'
import { Button } from 'semantic-ui-react'

export default function HeaderPannel ({ gameState, setGameState }) {
  return (
    <div className='headerpannel'>
      {gameState === 'ready'
        ? (<Button primary style={{ margin: '0 auto' }} onClick={() => setGameState('started')}>Start</Button>)
        : (<Button secondary style={{ margin: '0 auto' }} onClick={() => setGameState('ready')}>Pause</Button>)}
    </div>
  )
}
