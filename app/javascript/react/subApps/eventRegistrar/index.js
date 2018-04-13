import React from 'react'
import { Route } from 'react-router'

import EventsIndex   from './connectors/EventsIndex'
import EventShow     from './connectors/EventShow'
import LodgingSurvey from './connectors/LodgingSurvey'
import Register      from './connectors/Register'
import Volunteer     from './connectors/Volunteer'

const EventRegistrar = props => {
  return(
    <div>
      <Route exact path='/events' component={EventsIndex} />
      <Route exact path='/events/:eventSlug' component={EventShow} />
      <Route exact path='/events/:eventSlug/lodgings/new' component={LodgingSurvey} />
      <Route exact path='/events/:eventSlug/register' component={Register} />
      <Route exact path='/events/:eventSlug/volunteer' component={Volunteer} />
    </div>
  )
}

export default EventRegistrar
