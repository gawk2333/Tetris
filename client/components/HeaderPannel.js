import React from 'react'
import { Button, Label } from 'semantic-ui-react'

export default function HeaderPannel ({
  gameState,
  setGameState,
  score
}) {
  return (
    <div className='headerpannel'>
      <Label style={{
        float: 'left',
        height: 37,
        paddingTop: 10
      }}>
        Score:{score}
      </Label>
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
