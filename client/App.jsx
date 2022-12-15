import React, { useRef, useEffect, useState, useContext } from 'react'
import Playground from './components/Playground'
import HeaderPannel from './components/HeaderPannel'
import GamePad from './components/GamePad'
import Headerr from './components/Header'
import { isMobile } from 'react-device-detect'
import { toast, ToastContainer } from 'react-toastify'
import jwt from 'jwt-decode'
import _ from 'lodash'
import { LoginContext } from './store'
import { tokenSignInApi } from './api/auth'
import { Sticky } from 'semantic-ui-react'

const App = () => {
  const [gameState, setGameState] = useState('ready')
  const [keyPressNumber, setKeyPressNumber] = useState(0)
  const [gameTime, setGameTime] = useState(180)
  const [keyCode, setKeyCode] = useState(null)
  const [score, setScore] = useState(0)
  const keydownRef = useRef(null)
  const token = window.localStorage.getItem('authToken')
  const loginDispatch = useContext(LoginContext.Dispatch)
  const loginState = useContext(LoginContext.State)

  useEffect(async () => {
    if ((!token) || (_.isUndefined(token))) {
      loginDispatch({ type: LoginContext.types.LOGOUT })
      // console.log('token not exist')
    } else {
      const user = jwt(token)
      const timeStamp = Date.now()
      if (user.exp * 1000 > timeStamp) {
        const result = await tokenSignInApi({ token })
        if (result.error) {
          toast.error(result.message)
        } else {
          loginDispatch({
            type: LoginContext.types.LOGIN,
            payload: {
              userName: user.userName,
              score: result.user.score,
              token: result.user.token
            }
          })
        }
      }
    }
  }, [loginState.userName])

  const keyDownHandler = (e) => {
    if (gameState === 'started') {
      e.preventDefault()
    }
    if (e) {
      setKeyPressNumber(keyPressNumber + 1)
      setKeyCode(e.keyCode)
    }
  }

  const getKeyCode = () => {
    return keyCode
  }

  useEffect(() => {
    if (gameState === 'started') {
      if (keydownRef) {
        keydownRef.current.focus()
      }
      if (gameTime > 0) {
        setTimeout(() =>
          setGameTime(gameTime - 1),
        1000)
      } else {
        setGameState('game over')
      }
    }
  }, [gameState, gameTime])

  return (
    <div
      className='mainPage'
      tabIndex={0}
      onKeyDown={keyDownHandler}
      ref={keydownRef}
    >
      <Sticky context={keydownRef}>
        <Headerr
          style={{ position: 'sticky', top: 0 }}
          score={score}
          setGameState={setGameState}
          setScore={setScore}
          setGameTime={setGameTime}
          token={token}/>
      </Sticky>
      <ToastContainer/>
      <HeaderPannel
        gameTime={gameTime}
        score = {score}
      />
      <Playground
        gameState = {gameState}
        setGameState={setGameState}
        gameTime={gameTime}
        setGameTime = {setGameTime}
        score={score}
        setScore={setScore}
        getKeyCode={getKeyCode}
        keyPressNumber={keyPressNumber}
        loginState={loginState}
        loginDispatch={loginDispatch}/>
      {isMobile &&
     <GamePad
       keyPressNumber={keyPressNumber}
       setKeyPressNumber={setKeyPressNumber}
       setKeyCode = {setKeyCode}
     />}
    </div>
  )
}

export default App
