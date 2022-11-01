import React from 'react'
import { render } from 'react-dom'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import { Provider } from 'react-redux'
// import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
// import reducers from './reducers'
import App from './App'

// const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
//                           typeof window !== 'undefined' &&
//                           window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//                           compose

// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.getElementById('app')
  )
})
