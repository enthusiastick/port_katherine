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

import AccountConfirmation    from '../react/connectors/AccountConfirmation'
import LandingPage            from '../react/components/LandingPage'
import EditUser               from '../react/connectors/EditUser'
import NavigationBar          from '../react/connectors/NavigationBar'
import Notices                from '../react/connectors/Notices'
import PasswordReset          from '../react/connectors/PasswordReset'
import RequestPasswordReset   from '../react/connectors/RequestPasswordReset'
import SignIn                 from '../react/connectors/SignIn'
import SignOut                from '../react/connectors/SignOut'
import SignUp                 from '../react/connectors/SignUp'

import currentUser from '../react/reducers/currentUser'
import notices from '../react/reducers/notices'

const history = createBrowserHistory()

const middlewares = [thunkMiddleware, routerMiddleware(history)]

const store = createStore(
  combineReducers({
    currentUser,
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
              <Route path='/password_resets/:passwordResetId/edit' component={PasswordReset} />
              <Route exact path='/edit-user' component={EditUser} />
              <Route exact path='/password_resets/new' component={RequestPasswordReset} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-out' component={SignOut} />
              <Route exact path='/sign-up' component={SignUp} />
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
