import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import License  from '../react/sharedResources/components/License'

import Admin             from '../react/subApps/admin'
import BetweenGames      from '../react/subApps/betweenGames'
import CharacterBuilder  from '../react/subApps/characterBuilder'
import HomePage          from '../react/subApps/homepage'
import EventRegistrar    from '../react/subApps/eventRegistrar'
import Navigator         from '../react/subApps/navigator'
import StaticPages       from '../react/sharedResources'
import UserAuthenticator from '../react/subApps/userAuthenticator'

import rootReducer from '../react/rootReducer'

const history = createBrowserHistory()

const middlewares = [thunkMiddleware, routerMiddleware(history)]

const store = createStore(
  rootReducer,
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
            <BetweenGames />
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
