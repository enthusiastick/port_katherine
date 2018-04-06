import React from 'react'
import { Route } from 'react-router'

import NavigationBar from './connectors/NavigationBar'
import Notices       from '../../sharedResources/connectors/Notices'

const Navigator = props => {
  return(
    <div>
      <Route path='/' component={NavigationBar} />
      <Route path='/' component={Notices} />
    </div>
  )
}

export default Navigator
