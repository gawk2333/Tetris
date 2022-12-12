import React from 'react'
import { render } from 'react-dom'
import { Store } from './store'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Store>
      <App />
    </Store>,
    document.getElementById('app')
  )
})
