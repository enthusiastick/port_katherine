import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import adminBgs        from './subApps/admin/betweenGames/reducers/adminBgs'
import adminCharacters from './subApps/admin/characterManager/reducers/adminCharacters'
import adminEvents     from './subApps/admin/eventManager/reducers/adminEvents'
import adminSkills     from './subApps/admin/skillDesigner/reducers/adminSkills'
import adminUsers      from './subApps/admin/userManager/reducers/adminUsers'
import betweenGames    from './subApps/betweenGames/reducers/betweenGames'
import characters      from './subApps/characterBuilder/reducers/characters'
import currentUser     from './sharedResources/reducers/currentUser'
import delta           from './subApps/characterBuilder/reducers/delta'
import headers         from './sharedResources/reducers/headers'
import homepage        from './subApps/homepage/reducers/homepage'
import events          from './subApps/eventRegistrar/reducers/events'
import notices         from './sharedResources/reducers/notices'
import token           from './subApps/eventRegistrar/reducers/token'

const appReducer = combineReducers({
  adminBgs,
  adminCharacters,
  adminEvents,
  adminSkills,
  adminUsers,
  betweenGames,
  characters,
  currentUser,
  delta,
  headers,
  homepage,
  events,
  notices,
  token,
  form: formReducer,
  router: routerReducer
})

import { FETCH_DESTROY_SESSION_SUCCESS } from './subApps/userAuthenticator/actions/destroySession'

const rootReducer = (state, action) => {
  if (action.type === FETCH_DESTROY_SESSION_SUCCESS) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
