import React, { useContext } from 'react'
import { Button, Image, Segment } from 'semantic-ui-react'
import SignInPage from './auth/SignInPage'
import { LoginContext } from '../store'

export default function Cover ({
  gameState,
  setGameState,
  createCells,
  setGameTime,
  score,
  setScore,
  userName
}) {
  const bestScore = useContext(LoginContext.State).score
  const getCanvasStyle = () => {
    let opacity = 1
    switch (gameState) {
      default:
      case 'ready':
      case 'started':
        opacity = 0
        break
      case 'game over':
        opacity = 0.9
        break
    }
    return { opacity: opacity }
  }

  const getImageUrl = () => {
    switch (gameState) {
      default:
      case 'ready':
        return null
      case 'game over':
        return 'gameover.jpeg'
    }
  }

  return (
    <div className='cover' style={getCanvasStyle()}>
      <Image src={getImageUrl()}/>
      <Segment basic inverted center style={{ width: '80%' }}>
        <h5>Your score is:
          <span
            style={{ color: 'yellow' }}>
            {score}
          </span>
          {!userName
            ? (<>Sign in to save your record  </>)
            : (<>Your best score is:
              <span style={{ color: '#ff0000' }}>
                {score < bestScore
                  ? bestScore
                  : score}
              </span></>)
          }
        </h5>
      </Segment>
      <div>
        {!userName &&
        <SignInPage score={score}/>
        }
        <Button color='orange'
          onClick={() => {
            createCells()
            setGameTime(180)
            setScore(0)
            setGameState('started')
          }}>
      New game
        </Button>
      </div>
    </div>
  )
}
