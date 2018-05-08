import React from 'react'
import { Route, Switch } from 'react-router'

import {default as BetweenGamesIndex} from './connectors/BetweenGames'
import FeedbackEdit from './connectors/FeedbackEdit'
import FeedbackNew from './connectors/FeedbackNew'
import FeedbackShow from './connectors/FeedbackShow'

const BetweenGames = props => {
  return(
    <Switch>
      <Route exact path='/between-events' component={BetweenGamesIndex} />
      <Route exact path='/pels/new' component={FeedbackNew} />
      <Route exact path='/pels/:eventSlug' component={FeedbackShow} />
      <Route exact path='/pels/:eventSlug/edit' component={FeedbackEdit} />
    </Switch>
  )
}

export default BetweenGames
