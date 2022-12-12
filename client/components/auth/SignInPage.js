import React, { useState, useContext } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { LoginContext } from '../../store'
import { signInApi } from '../../api/auth'

function SignInPage ({ score }) {
  const [open, setOpen] = useState(false)
  const [signInForm, setsignInForm] = useState(
    {
      userName: '',
      password: '',
      score
    }
  )
  const loginDispatch = useContext(LoginContext.Dispatch)
  const signInHandler = async () => {
    if (signInForm.userName && signInForm.password) {
      const result = await signInApi(signInForm)
      if (!result.error) {
        const loginAction = {
          type: LoginContext.types.LOGIN,
          payload: {
            userName: signInForm.userName,
            score,
            token: result.token
          }
        }
        window.localStorage.setItem('authToken', result.token)
        loginDispatch(loginAction)
        setOpen(false)
      } else {
        toast.error(result.message)
      }
    } else {
      toast.error('All input is required')
    }
  }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className='signin'>Sign In</Button>}>
      <Modal.Content>
        <Form>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Username'
              placeholder='Username'
              value={signInForm.userName}
              autoComplete="Username"
              onChange={(e) => setsignInForm({
                userName: e.target.value,
                password: signInForm.password,
                score
              })}
            />
            <Form.Input label='Password'
              placeholder='Password'
              type='password'
              autoComplete="current-password"
              value={signInForm.password}
              onChange={(e) =>
                setsignInForm({
                  userName: signInForm.userName,
                  password: e.target.value,
                  score: 0
                })
              }
            />
          </Form.Group>
          <Button onClick={signInHandler} primary>Sign In</Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default SignInPage
