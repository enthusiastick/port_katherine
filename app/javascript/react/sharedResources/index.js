import React from 'react'
import { Route } from 'react-router'

import Contact   from './components/Contact'
import Downloads from './components/Downloads'
import Resources from './components/Resources'
import Values    from './components/Values'

const StaticPages = props => {
  return(
    <div>
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/downloads' component={Downloads} />
      <Route exact path='/links' component={Resources} />
      <Route exact path='/values' component={Values} />
    </div>
  )
}

export default StaticPages
