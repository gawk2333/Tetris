import React, { createContext, useReducer } from 'react'

const State = createContext()
const Dispatch = createContext()

const initialState = {
  userName: 'anonymous',
  score: 0,
  token: ''
}

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

const clearStorage = () => {
  window.localStorage.removeItem('authToken')
}

const reducer = (state, action) => {
  // console.log('LoginContext reducer -- action:', action)
  switch (action.type) {
    case types.LOGIN: {
      const {
        userName,
        score,
        token
      } = action.payload
      return {
        ...state,
        userName,
        score,
        token
      }
    }
    default:
    case types.LOGOUT: {
      clearStorage()
      return {
        ...initialState
      }
    }
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

export const LoginContext = {
  State,
  Dispatch,
  Provider,
  types
}
