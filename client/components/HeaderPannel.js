import React from 'react'
import { Label } from 'semantic-ui-react'
import isMobile from '../utils/isMobile'

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
      {navigator.platform}-
      {isMobile().toString()}
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
