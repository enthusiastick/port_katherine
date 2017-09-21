import { FETCH_CURRENT_USER, FETCH_CURRENT_USER_SUCCESS } from '../actions/getCurrentUser'
import { FETCH_CREATE_SESSION_SUCCESS } from '../../subApps/userAuthenticator/actions/createSession'
import { FETCH_DESTROY_SESSION_SUCCESS } from '../../subApps/userAuthenticator/actions/destroySession'

let initialState = {
  isFetching: false,
  item: { id: null }
}

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_SESSION_SUCCESS:
      return Object.assign({}, state, { item: action.currentUser })
    case FETCH_CURRENT_USER:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.currentUser
      })
    case FETCH_DESTROY_SESSION_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default currentUser
