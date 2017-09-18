import React from 'react'
import ReactDOM from 'react-dom'

import LandingPage from '../react/components/LandingPage'

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('react')

  if (reactElement) {
    ReactDOM.render(
      <LandingPage />,
      reactElement
    )
  }
})
