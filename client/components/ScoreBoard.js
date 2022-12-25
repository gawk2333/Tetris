import React, { useState, useEffect } from 'react'
import { Button, Modal, Grid, Icon } from 'semantic-ui-react'
import { scoreBoardApi } from '../api/score'
import { toast } from 'react-toastify'

export default function ScoreBoard () {
  const [open, setOpen] = useState(false)
  const [scoreBoard, setScoreBoard] = useState([])

  useEffect(async () => {
    if (open) {
      const result = await scoreBoardApi()
      if (!result.error) {
        setScoreBoard(result.scoreBoardInfo)
      } else {
        toast.message(result.message)
      }
    }
  }, [open])

  const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black'
  ]

  return (
    <Modal
      open={open}
      trigger={<Button secondary onClick={() => setOpen(!open)}>
        Scoreboard
      </Button>}
    >
      <Modal.Header>
        <h1>Score Board</h1>
      </Modal.Header>
      <Modal.Content>
        <Grid style={{ textAlign: 'center' }}>
          <Grid.Row key={'row-Header'} columns={2}>
            <Grid.Column>
              User Name
            </Grid.Column>
            <Grid.Column>
              Score
            </Grid.Column>
          </Grid.Row>
          {scoreBoard.map((score, index) => {
            return (
              <Grid.Row key={`row-${index}`} columns={2}>
                <Grid.Column color={colors[index * 2]}>
                  {score.user_name}
                </Grid.Column>
                <Grid.Column color={colors[index * 2 + 1]}>
                  {score.score}
                </Grid.Column>
              </Grid.Row>)
          })}
        </Grid>
      </Modal.Content>    <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
