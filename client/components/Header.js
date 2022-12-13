import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import AuthenticationButton from './auth/AuthenticationButton'

function Headerr ({ score, token, userName }) {
  return (
    <Segment basic inverted>
      <Header as='h1'>
        Tetris
        <AuthenticationButton
          score={score}
          token={token}
          userName={userName}/>
      </Header>
    </Segment>
  )
}

export default Headerr
