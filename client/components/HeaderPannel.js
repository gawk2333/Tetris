import React from 'react'
import { Label } from 'semantic-ui-react'

export default function HeaderPannel ({
  score,
  gameTime
}) {
  return (
    <div className='headerpannel'>
      <Label style={{
        float: 'left',
        height: 37,
        paddingTop: 10
      }}>
        time:{parseInt(gameTime / 3600)}:{parseInt((gameTime % 3600) / 60)}:{parseInt(gameTime % 60)}
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
