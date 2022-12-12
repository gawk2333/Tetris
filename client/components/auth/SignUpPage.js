import React, { useState, useContext } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { LoginContext } from '../../store'
import { signUpApi } from '../../api/auth'

function SignUpPage ({ score }) {
  const [open, setOpen] = React.useState(false)
  const loginDispatch = useContext(LoginContext.Dispatch)
  const [signUpForm, setSignUpForm] = useState(
    {
      userName: '',
      password: '',
      score
    }
  )
  const signUpHandler = async () => {
    if (signUpForm.userName && signUpForm.password) {
      const result = await signUpApi(signUpForm)
      if (result.error) {
        toast.error(result.message)
      } else {
        const loginAction = {
          type: LoginContext.types.LOGIN,
          payload: {
            userName: signUpForm.userName,
            score,
            token: result.token
          }
        }
        window.localStorage.setItem('authToken', result.token)
        loginDispatch(loginAction)
        setOpen(false)
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
      trigger={<Button className='signup'>Sign Up</Button>}>
      <Modal.Content>
        <Form>
          <Form.Group unstackable widths={2}>
            <Form.Input label='UserName'
              placeholder='UserName'
              autoComplete='userName'
              onChange={(e) => setSignUpForm({
                userName: e.target.value,
                password: signUpForm.password,
                score
              })}
            />
            <Form.Input label='Password'
              placeholder='Password'
              type='password'
              autoComplete='current-password'
              onChange={(e) => setSignUpForm({
                userName: signUpForm.userName,
                password: e.target.value,
                score
              })}
            />
          </Form.Group>
          <Button onClick={signUpHandler}>Sign Up</Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default SignUpPage
