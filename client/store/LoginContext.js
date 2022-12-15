import React, { createContext, useReducer } from 'react'

const State = createContext()
const Dispatch = createContext()

const initialState = {
  userName: '',
  score: 0,
  token: ''
}

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_SCORE: 'UPDATE_SCORE'
}

const clearStorage = () => {
  window.localStorage.removeItem('authToken')
}

const reducer = (state, action) => {
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
    case types.UPDATE_SCORE: {
      const {
        score
      } = action.payload
      return {
        ...state,
        score
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
