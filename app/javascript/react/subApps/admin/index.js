import React from 'react'
import { Route, Switch } from 'react-router'

import AdminIndex from './connectors/AdminIndex'
import AdminPointDispenser from './connectors/AdminPointDispenser'
import AdminPointTransferer from './connectors/AdminPointTransferer'

import AdminBgsIndex from './betweenGames/connectors/Index'
import AdminBgsNew from './betweenGames/connectors/New'
import AdminBgsShow from './betweenGames/connectors/Show'

import AdminCharacterLocks from './characterManager/connectors/AdminCharacterLocks'
import AdminCharacterNewHeader from './characterManager/connectors/AdminCharacterNewHeader'
import AdminCharacterNewSkill from './characterManager/connectors/AdminCharacterNewSkill'
import AdminEditCharacter from './characterManager/connectors/AdminEditCharacter'
import AdminIndexBackstories from './characterManager/connectors/AdminIndexBackstories'
import AdminIndexCharacters from './characterManager/connectors/AdminIndexCharacters'
import AdminIndexTallies from './characterManager/connectors/AdminIndexTallies'
import AdminShowCharacter from './characterManager/connectors/AdminShowCharacter'

import AdminEventCheckIn from './eventManager/connectors/AdminEventCheckIn'
import AdminEventEdit from './eventManager/connectors/AdminEventEdit'
import AdminEventEnvelopesIndex from './eventManager/connectors/AdminEventEnvelopesIndex'
import AdminEventHeadersIndex from './eventManager/connectors/AdminEventHeadersIndex'
import AdminEventPelShow from './eventManager/connectors/AdminEventPelShow'
import AdminEventPelsIndex from './eventManager/connectors/AdminEventPelsIndex'
import AdminEventReportsIndex from './eventManager/connectors/AdminEventReportsIndex'
import AdminEventSelfReportsIndex from './eventManager/connectors/AdminEventSelfReportsIndex'
import AdminEventShow from './eventManager/connectors/AdminEventShow'
import AdminEventsIndex from './eventManager/connectors/AdminEventsIndex'
import AdminEventsNew from './eventManager/connectors/AdminEventsNew'

import AdminUsersIndex from './userManager/connectors/AdminUsersIndex'
import AdminUserShow from './userManager/connectors/AdminUserShow'

import SkillDesigner from './skillDesigner/index'

const Admin = props => (
  <div>
    <Route exact path='/admin' component={AdminIndex} />
    <Route exact path='/admin/award_character_points' component={AdminPointDispenser} />
    <Route exact path='/admin/transfer_character_points' component={AdminPointTransferer} />

    <Switch>
      <Route exact path='/admin/bgs' component={AdminBgsIndex} />
      <Route exact path='/admin/bgs/new' component={AdminBgsNew} />
      <Route exact path='/admin/bgs/:bgsId' component={AdminBgsShow} />
    </Switch>

    <Switch>
      <Route exact path='/admin/characters' component={AdminIndexCharacters} />
      <Route exact path='/admin/characters/:characterId' component={AdminShowCharacter} />
      <Route exact path='/admin/characters/:characterId/backstories' component={AdminIndexBackstories} />
      <Route exact path='/admin/characters/:characterId/build_logs' component={AdminIndexTallies} />
      <Route exact path='/admin/characters/:characterId/edit' component={AdminEditCharacter} />
      <Route exact path='/admin/characters/:characterId/locks' component={AdminCharacterLocks} />
      <Route exact path='/admin/characters/:characterId/headers/new' component={AdminCharacterNewHeader} />
      <Route exact path='/admin/characters/:characterId/skills/new' component={AdminCharacterNewSkill} />
    </Switch>

    <Switch>
      <Route exact path='/admin/events' component={AdminEventsIndex} />
      <Route exact path='/admin/events/new' component={AdminEventsNew} />
      <Route exact path='/admin/events/:eventSlug' component={AdminEventShow} />
      <Route exact path='/admin/events/:eventSlug/bgs' component={AdminBgsIndex} />
      <Route exact path='/admin/events/:eventSlug/check-in' component={AdminEventCheckIn} />
      <Route exact path='/admin/events/:eventSlug/edit' component={AdminEventEdit} />
      <Route exact path='/admin/events/:eventSlug/envelopes' component={AdminEventEnvelopesIndex} />
      <Route exact path='/admin/events/:eventSlug/headers_professions' component={AdminEventHeadersIndex} />
      <Route exact path='/admin/events/:eventSlug/pels/:userHandle' component={AdminEventPelShow} />
      <Route exact path='/admin/events/:eventSlug/pels' component={AdminEventPelsIndex} />
      <Route exact path='/admin/events/:eventSlug/reports' component={AdminEventReportsIndex} />
      <Route exact path='/admin/events/:eventSlug/self_reports' component={AdminEventSelfReportsIndex} />
    </Switch>

    <Switch>
      <Route exact path='/admin/users' component={AdminUsersIndex} />
      <Route exact path='/admin/users/:userId' component={AdminUserShow} />
    </Switch>

    <SkillDesigner />
  </div>
)

export default Admin
