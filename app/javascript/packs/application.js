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

import HomePage from '../react/sharedResources/components/HomePage'
import License  from '../react/sharedResources/components/License'

import Admin             from '../react/subApps/admin'
import CharacterBuilder  from '../react/subApps/characterBuilder'
import EventRegistrar    from '../react/subApps/eventRegistrar'
import Navigator         from '../react/subApps/navigator'
import StaticPages       from '../react/sharedResources'
import UserAuthenticator from '../react/subApps/userAuthenticator'

import adminCharacters from '../react/subApps/admin/characterManager/reducers/adminCharacters'
import adminEvents     from '../react/subApps/admin/eventManager/reducers/adminEvents'
import adminUsers      from '../react/subApps/admin/userManager/reducers/adminUsers'
import characters      from '../react/subApps/characterBuilder/reducers/characters'
import currentUser     from '../react/sharedResources/reducers/currentUser'
import delta           from '../react/subApps/characterBuilder/reducers/delta'
import headers         from '../react/subApps/characterBuilder/reducers/headers'
import events          from '../react/subApps/eventRegistrar/reducers/events'
import notices         from '../react/sharedResources/reducers/notices'
import token           from '../react/subApps/eventRegistrar/reducers/token'

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
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Navigator />
            <Route exact path='/' component={HomePage} />

            <Admin />
            <CharacterBuilder />
            <EventRegistrar />
            <StaticPages />
            <UserAuthenticator />

            <Route path='/' component={License} />
          </div>
        </ConnectedRouter>
      </Provider>,
      reactElement
    )
  }
})
