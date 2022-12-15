import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import AuthenticationButton from './auth/AuthenticationButton'

function Headerr ({ score, token, setGameState, setScore, setGameTime }) {
  return (
    <Segment basic inverted>
      <Header as='h1'>
        Tetris
        <AuthenticationButton
          score={score}
          token={token}
          setGameState={setGameState}
          setScore={setScore}
          setGameTime={setGameTime}
        />
      </Header>
    </Segment>
  )
}

export default Headerr
