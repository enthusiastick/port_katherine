import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createBrowserHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'

import Contact                from '../react/sharedResources/components/Contact'
import Downloads              from '../react/sharedResources/components/Downloads'
import HomePage               from '../react/sharedResources/components/HomePage'
import LandingPage            from '../react/sharedResources/components/LandingPage'
import License                from '../react/sharedResources/components/License'
import Notices                from '../react/sharedResources/connectors/Notices'
import Resources              from '../react/sharedResources/components/Resources'
import Values                 from '../react/sharedResources/components/Values'

import AdminShowCharacter     from '../react/subApps/admin/characterManager/connectors/AdminShowCharacter'
import AdminIndexCharacters   from '../react/subApps/admin/characterManager/connectors/AdminIndexCharacters'

import AdminEventEdit         from '../react/subApps/admin/eventManager/connectors/AdminEventEdit'
import AdminEventShow         from '../react/subApps/admin/eventManager/connectors/AdminEventShow'
import AdminEventsIndex       from '../react/subApps/admin/eventManager/connectors/AdminEventsIndex'
import AdminEventsNew         from '../react/subApps/admin/eventManager/connectors/AdminEventsNew'

import AdminUsersIndex        from '../react/subApps/admin/userManager/connectors/AdminUsersIndex'
import AdminUserShow          from '../react/subApps/admin/userManager/connectors/AdminUserShow'

import EditBackstory          from '../react/subApps/characterBuilder/connectors/EditBackstory'
import EditCharacter          from '../react/subApps/characterBuilder/connectors/EditCharacter'
import IndexCharacters        from '../react/subApps/characterBuilder/connectors/IndexCharacters'
import NewCharacter           from '../react/subApps/characterBuilder/connectors/NewCharacter'
import ShowCharacter          from '../react/subApps/characterBuilder/connectors/ShowCharacter'

import EventsIndex            from '../react/subApps/eventRegistrar/connectors/EventsIndex'
import EventShow              from '../react/subApps/eventRegistrar/connectors/EventShow'
import Register               from '../react/subApps/eventRegistrar/connectors/Register'
import Volunteer              from '../react/subApps/eventRegistrar/connectors/Volunteer'

import NavigationBar          from '../react/subApps/navigator/connectors/NavigationBar'

import AccountConfirmation    from '../react/subApps/userAuthenticator/connectors/AccountConfirmation'
import EditUser               from '../react/subApps/userAuthenticator/connectors/EditUser'
import PasswordReset          from '../react/subApps/userAuthenticator/connectors/PasswordReset'
import RequestPasswordReset   from '../react/subApps/userAuthenticator/connectors/RequestPasswordReset'
import SignIn                 from '../react/subApps/userAuthenticator/connectors/SignIn'
import SignOut                from '../react/subApps/userAuthenticator/connectors/SignOut'
import SignUp                 from '../react/subApps/userAuthenticator/connectors/SignUp'

import AdminIndex             from '../react/subApps/admin/connectors/AdminIndex'

import adminCharacters from '../react/subApps/admin/characterManager/reducers/adminCharacters'
import adminEvents from '../react/subApps/admin/eventManager/reducers/adminEvents'
import adminUsers  from '../react/subApps/admin/userManager/reducers/adminUsers'
import characters  from '../react/subApps/characterBuilder/reducers/characters'
import currentUser from '../react/sharedResources/reducers/currentUser'
import delta       from '../react/subApps/characterBuilder/reducers/delta'
import headers     from '../react/subApps/characterBuilder/reducers/headers'
import events      from '../react/subApps/eventRegistrar/reducers/events'
import notices     from '../react/sharedResources/reducers/notices'
import token       from '../react/subApps/eventRegistrar/reducers/token'

const history = createBrowserHistory()

const middlewares = [thunkMiddleware, routerMiddleware(history)]

const store = createStore(
  combineReducers({
    adminCharacters,
    adminEvents,
    adminUsers,
    characters,
    currentUser,
    delta,
    headers,
    events,
    notices,
    token,
    form: formReducer,
    router: routerReducer
  }),
  applyMiddleware(...middlewares)
)

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('react')

  if (reactElement) {
    if (process.env.RELEASE_THE_KRAKEN === 'true') {
      ReactDOM.render(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Route path='/' component={NavigationBar} />
              <Route path='/' component={Notices} />
              <Route exact path='/' component={HomePage} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/downloads' component={Downloads} />
              <Route exact path='/links' component={Resources} />
              <Route exact path='/values' component={Values} />

              <Route exact path='/account_confirmations/:confirmationToken/edit' component={AccountConfirmation} />
              <Route exact path='/edit-user' component={EditUser} />
              <Route exact path='/password_resets/:passwordResetId/edit' component={PasswordReset} />
              <Route exact path='/password_resets/new' component={RequestPasswordReset} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-out' component={SignOut} />
              <Route exact path='/sign-up' component={SignUp} />

              <Route exact path='/admin' component={AdminIndex} />

              <Switch>
                <Route exact path='/admin/characters' component={AdminIndexCharacters} />
                <Route exact path='/admin/characters/:characterId' component={AdminShowCharacter} />
              </Switch>

              <Switch>
                <Route exact path='/admin/events' component={AdminEventsIndex} />
                <Route exact path='/admin/events/new' component={AdminEventsNew} />
                <Route exact path='/admin/events/:eventSlug' component={AdminEventShow} />
                <Route exact path='/admin/events/:eventSlug/edit' component={AdminEventEdit} />
              </Switch>

              <Switch>
                <Route exact path='/admin/users' component={AdminUsersIndex} />
                <Route exact path='/admin/users/:userId' component={AdminUserShow} />
              </Switch>

              <Switch>
                <Route exact path='/characters' component={IndexCharacters} />
                <Route exact path='/characters/:characterId/backstory' component={EditBackstory} />
                <Route exact path='/characters/new' component={NewCharacter} />
                <Route exact path='/characters/:characterId/edit' component={EditCharacter} />
                <Route exact path='/characters/:characterId' component={ShowCharacter} />
              </Switch>

              <Route exact path='/events' component={EventsIndex} />
              <Route exact path='/events/:eventSlug' component={EventShow} />
              <Route exact path='/events/:eventSlug/register' component={Register} />
              <Route exact path='/events/:eventSlug/volunteer' component={Volunteer} />
              <Route path='/' component={License} />
            </div>
          </ConnectedRouter>
        </Provider>,
        reactElement
      )
    } else {
      ReactDOM.render(
        <LandingPage />,
        reactElement
      )
    }
  }
})
