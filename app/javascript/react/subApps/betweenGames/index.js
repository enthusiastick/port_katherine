import React from 'react'
import { Route, Switch } from 'react-router'

import { default as BetweenGamesIndex } from './connectors/BetweenGames'

import BgsNew from './connectors/bgs/New'

import FeedbackEdit from './connectors/feedback/Edit'
import FeedbackNew from './connectors/feedback/New'
import FeedbackShow from './connectors/feedback/Show'

const BetweenGames = props => {
  return(
    <div>
      <Route exact path='/between-events' component={BetweenGamesIndex} />
      <Switch>
        <Route exact path='/bgs/new' component={BgsNew} />
      </Switch>
      <Switch>
        <Route exact path='/pels/new' component={FeedbackNew} />
        <Route exact path='/pels/:eventSlug' component={FeedbackShow} />
        <Route exact path='/pels/:eventSlug/edit' component={FeedbackEdit} />
      </Switch>
    </div>
  )
}

export default BetweenGames
