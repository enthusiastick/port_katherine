import React from 'react'
import { Route, Switch } from 'react-router'

import AdminIndex from './connectors/AdminIndex'
import AdminPointDispenser from './connectors/AdminPointDispenser'

import AdminBgsIndex from './betweenGames/connectors/Index'
import AdminBgsShow from './betweenGames/connectors/Show'

import AdminIndexBackstories from './characterManager/connectors/AdminIndexBackstories'
import AdminIndexCharacters from './characterManager/connectors/AdminIndexCharacters'
import AdminIndexTallies from './characterManager/connectors/AdminIndexTallies'
import AdminShowCharacter from './characterManager/connectors/AdminShowCharacter'

import AdminEventCheckIn from './eventManager/connectors/AdminEventCheckIn'
import AdminEventEdit from './eventManager/connectors/AdminEventEdit'
import AdminEventEnvelopesIndex from './eventManager/connectors/AdminEventEnvelopesIndex'
import AdminEventPelShow from './eventManager/connectors/AdminEventPelShow'
import AdminEventPelsIndex from './eventManager/connectors/AdminEventPelsIndex'
import AdminEventReportsIndex from './eventManager/connectors/AdminEventReportsIndex'
import AdminEventSelfReportsIndex from './eventManager/connectors/AdminEventSelfReportsIndex'
import AdminEventShow from './eventManager/connectors/AdminEventShow'
import AdminEventsIndex from './eventManager/connectors/AdminEventsIndex'
import AdminEventsNew from './eventManager/connectors/AdminEventsNew'

import AdminUsersIndex from './userManager/connectors/AdminUsersIndex'
import AdminUserShow from './userManager/connectors/AdminUserShow'

const Admin = props => {
  return(
    <div>
      <Route exact path='/admin' component={AdminIndex} />
      <Route exact path='/admin/award_character_points' component={AdminPointDispenser} />

      <Switch>
        <Route exact path='/admin/bgs' component={AdminBgsIndex} />
        <Route exact path='/admin/bgs/:bgsId' component={AdminBgsShow} />
      </Switch>

      <Switch>
        <Route exact path='/admin/characters' component={AdminIndexCharacters} />
        <Route exact path='/admin/characters/:characterId' component={AdminShowCharacter} />
        <Route exact path='/admin/characters/:characterId/backstories' component={AdminIndexBackstories} />
        <Route exact path='/admin/characters/:characterId/build_logs' component={AdminIndexTallies} />
      </Switch>

      <Switch>
        <Route exact path='/admin/events' component={AdminEventsIndex} />
        <Route exact path='/admin/events/new' component={AdminEventsNew} />
        <Route exact path='/admin/events/:eventSlug' component={AdminEventShow} />
        <Route exact path='/admin/events/:eventSlug/bgs' component={AdminBgsIndex} />
        <Route exact path='/admin/events/:eventSlug/check-in' component={AdminEventCheckIn} />
        <Route exact path='/admin/events/:eventSlug/edit' component={AdminEventEdit} />
        <Route exact path='/admin/events/:eventSlug/envelopes' component={AdminEventEnvelopesIndex} />
        <Route exact path='/admin/events/:eventSlug/pels/:userHandle' component={AdminEventPelShow} />
        <Route exact path='/admin/events/:eventSlug/pels' component={AdminEventPelsIndex} />
        <Route exact path='/admin/events/:eventSlug/reports' component={AdminEventReportsIndex} />
        <Route exact path='/admin/events/:eventSlug/self_reports' component={AdminEventSelfReportsIndex} />
      </Switch>

      <Switch>
        <Route exact path='/admin/users' component={AdminUsersIndex} />
        <Route exact path='/admin/users/:userId' component={AdminUserShow} />
      </Switch>
    </div>
  )
}

export default Admin
