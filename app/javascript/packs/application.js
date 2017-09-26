import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createBrowserHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'

import LandingPage            from '../react/sharedResources/components/LandingPage'
import Notices                from '../react/sharedResources/connectors/Notices'

import AdminEventsEdit        from '../react/subApps/admin/eventManager/connectors/AdminEventsEdit'
import AdminEventsIndex       from '../react/subApps/admin/eventManager/connectors/AdminEventsIndex'
import AdminEventsNew         from '../react/subApps/admin/eventManager/connectors/AdminEventsNew'

import EventsIndex            from '../react/subApps/eventRegistration/connectors/EventsIndex'

import NavigationBar          from '../react/subApps/navigation/connectors/NavigationBar'

import AccountConfirmation    from '../react/subApps/userAuthenticator/connectors/AccountConfirmation'
import EditUser               from '../react/subApps/userAuthenticator/connectors/EditUser'
import PasswordReset          from '../react/subApps/userAuthenticator/connectors/PasswordReset'
import RequestPasswordReset   from '../react/subApps/userAuthenticator/connectors/RequestPasswordReset'
import SignIn                 from '../react/subApps/userAuthenticator/connectors/SignIn'
import SignOut                from '../react/subApps/userAuthenticator/connectors/SignOut'
import SignUp                 from '../react/subApps/userAuthenticator/connectors/SignUp'

import AdminIndex             from '../react/subApps/admin/connectors/AdminIndex'

import adminEvents from '../react/subApps/admin/eventManager/reducers/adminEvents'
import currentUser from '../react/sharedResources/reducers/currentUser'
import events from '../react/subApps/eventRegistration/reducers/events'
import notices     from '../react/sharedResources/reducers/notices'

const history = createBrowserHistory()

const middlewares = [thunkMiddleware, routerMiddleware(history)]

const store = createStore(
  combineReducers({
    adminEvents,
    currentUser,
    events,
    notices,
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
              <Route exact path='/' component={LandingPage} />

              <Route path='/account_confirmations/:confirmationToken/edit' component={AccountConfirmation} />
              <Route exact path='/edit-user' component={EditUser} />
              <Route path='/password_resets/:passwordResetId/edit' component={PasswordReset} />
              <Route exact path='/password_resets/new' component={RequestPasswordReset} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-out' component={SignOut} />
              <Route exact path='/sign-up' component={SignUp} />

              <Route exact path='/admin' component={AdminIndex} />
              <Route exact path='/admin/events' component={AdminEventsIndex} />
              <Route path='/admin/events/:eventSlug/edit' component={AdminEventsEdit} />
              <Route exact path='/admin/events/new' component={AdminEventsNew} />

              <Route exact path='/events' component={EventsIndex} />
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
