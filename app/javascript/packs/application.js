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

import Contact           from '../react/sharedResources/components/Contact'
import Downloads         from '../react/sharedResources/components/Downloads'
import HomePage          from '../react/sharedResources/components/HomePage'
import LandingPage       from '../react/sharedResources/components/LandingPage'
import License           from '../react/sharedResources/components/License'
import Notices           from '../react/sharedResources/connectors/Notices'
import Resources         from '../react/sharedResources/components/Resources'
import Values            from '../react/sharedResources/components/Values'

import Admin             from '../react/subApps/admin'
import CharacterBuilder  from '../react/subApps/characterBuilder'
import EventRegistrar    from '../react/subApps/eventRegistrar'
import UserAuthenticator from '../react/subApps/userAuthenticator'

import NavigationBar     from '../react/subApps/navigator/connectors/NavigationBar'

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

            <Admin />
            <CharacterBuilder />
            <EventRegistrar />
            <UserAuthenticator />

            <Route path='/' component={License} />
          </div>
        </ConnectedRouter>
      </Provider>,
      reactElement
    )
  }
})
