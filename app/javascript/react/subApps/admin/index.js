import React from 'react'
import { Route, Switch } from 'react-router'

import AdminIndex             from './connectors/AdminIndex'
import AdminPointDispenser    from './connectors/AdminPointDispenser'

import AdminIndexBackstories from './characterManager/connectors/AdminIndexBackstories'
import AdminIndexCharacters  from './characterManager/connectors/AdminIndexCharacters'
import AdminShowCharacter    from './characterManager/connectors/AdminShowCharacter'

import AdminEventEdit         from './eventManager/connectors/AdminEventEdit'
import AdminEventReportsIndex from './eventManager/connectors/AdminEventReportsIndex'
import AdminEventShow         from './eventManager/connectors/AdminEventShow'
import AdminEventsIndex       from './eventManager/connectors/AdminEventsIndex'
import AdminEventsNew        from './eventManager/connectors/AdminEventsNew'

import AdminUsersIndex       from './userManager/connectors/AdminUsersIndex'
import AdminUserShow         from './userManager/connectors/AdminUserShow'

const Admin = props => {
  return(
    <div>
      <Route exact path='/admin' component={AdminIndex} />
      <Route exact path='/admin/award_character_points' component={AdminPointDispenser} />

      <Switch>
        <Route exact path='/admin/characters' component={AdminIndexCharacters} />
        <Route exact path='/admin/characters/:characterId' component={AdminShowCharacter} />
        <Route exact path='/admin/characters/:characterId/backstories' component={AdminIndexBackstories} />
      </Switch>

      <Switch>
        <Route exact path='/admin/events' component={AdminEventsIndex} />
        <Route exact path='/admin/events/new' component={AdminEventsNew} />
        <Route exact path='/admin/events/:eventSlug' component={AdminEventShow} />
        <Route exact path='/admin/events/:eventSlug/edit' component={AdminEventEdit} />
        <Route exact path='/admin/events/:eventSlug/reports' component={AdminEventReportsIndex} />
      </Switch>

      <Switch>
        <Route exact path='/admin/users' component={AdminUsersIndex} />
        <Route exact path='/admin/users/:userId' component={AdminUserShow} />
      </Switch>
    </div>
  )
}

export default Admin
