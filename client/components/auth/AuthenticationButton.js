import React, { useContext } from 'react'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import { Button } from 'semantic-ui-react'
import { LoginContext } from '../../store'

const AuthenticationButton = ({ score, token }) => {
  const logoutAction = {
    type: LoginContext.types.LOGOUT
  }
  const logoutDispatch = useContext(LoginContext.Dispatch)
  const logoutHandler = () => {
    logoutDispatch(logoutAction)
  }

  return (
    <div className='authbtn' style={{ float: 'right' }}>
      {!token
        ? <div>
          <SignInPage score={score}/>
          <SignUpPage score={score}/>
        </div>
        : <Button className='logout'
          onClick={logoutHandler}>
          Log Off
        </Button>}
    </div>)
}

export default AuthenticationButton
