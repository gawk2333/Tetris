import React, { useContext } from 'react'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import { Button } from 'semantic-ui-react'
import { LoginContext } from '../../store'

const AuthenticationButton = ({ score, token, setGameState, setScore, setGameTime }) => {
  const logoutDispatch = useContext(LoginContext.Dispatch)
  const logoutHandler = () => {
    const logoutAction = {
      type: LoginContext.types.LOGOUT
    }
    logoutDispatch(logoutAction)
    setScore(0)
    setGameTime(180)
    setGameState('ready')
  }
  const userName = useContext(LoginContext.State).userName

  return (
    <>
      {userName && <div style={{ color: 'yellow', float: 'right' }}>
        <h3>Hi, {userName}
        </h3>
      </div>}
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
      </div>
    </>)
}

export default AuthenticationButton
