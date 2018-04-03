import {
  FETCH_ADMIN_USERS,
  FETCH_ADMIN_USERS_SUCCESS,
  FETCH_ADMIN_USERS_FAILURE
} from '../../actions/getAdminUsers'

import {
  FETCH_ADMIN_USER_SUCCESS
} from '../actions/getAdminUser'

let initialState = {
  isFetching: false,
  items: [],
  show: {}
}

const adminUsers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_USERS:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_ADMIN_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.users
      })
    case FETCH_ADMIN_USERS_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    case FETCH_ADMIN_USER_SUCCESS:
      return Object.assign({}, state, { show: action.user })
    default:
      return state
  }
}

export default adminUsers
