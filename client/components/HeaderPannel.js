import React from 'react'
import { Label } from 'semantic-ui-react'

export default function HeaderPannel ({
  score,
  gameTime
}) {
  return (
    <div className='headerpannel'>
      <Label style={{
        height: 37,
        width: '40%',
        fontSize: 19,
        color: 'red'
      }}>
        Time:{parseInt(gameTime / 3600)}Hr,
        {parseInt((gameTime % 3600) / 60)}Min,
        {parseInt(gameTime % 60)}S
      </Label>
      <Label style={{
        height: 37,
        width: '40%',
        float: 'right',
        fontSize: 19,
        color: 'blue'
      }}>
        Score:{score}
      </Label>
    </div>
  )
}
