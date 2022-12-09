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
        Time:{gameTime}s
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
