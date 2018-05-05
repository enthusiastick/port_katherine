import React from 'react'
import { Route, Switch } from 'react-router'

import FeedbackNew from './connectors/FeedbackNew'

const BetweenGames = props => {
  return(
    <Switch>
      <Route exact path='/pels/new' component={FeedbackNew} />
    </Switch>
  )
}

export default BetweenGames
