import React from 'react'
import { Button, Label } from 'semantic-ui-react'

export default function HeaderPannel ({
  gameState,
  setGameState,
  score
}) {
  return (
    <div className='headerpannel'>
      {gameState === 'ready'
        ? (<Button primary onClick={() => setGameState('started')}>Start</Button>)
        : (<Button secondary onClick={() => setGameState('ready')}>Pause</Button>)}
      <Label style={{
        float: 'right',
        height: 37,
        paddingTop: 10
      }}>
        Score:{score}
      </Label>
    </div>
  )
}
