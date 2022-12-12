import React, { cloneElement } from 'react'
import { LoginContext } from './LoginContext'

const providers = [
  <LoginContext.Provider key='loginContext'/>
]

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  )

export {
  Store,
  LoginContext
}
