import {
  FETCH_ADMIN_USERS,
  FETCH_ADMIN_USERS_SUCCESS,
  FETCH_ADMIN_USERS_FAILURE
} from '../actions/getAdminUsers'

let initialState = {
  isFetching: false,
  items: []
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
    default:
      return state
  }
}

export default adminUsers
