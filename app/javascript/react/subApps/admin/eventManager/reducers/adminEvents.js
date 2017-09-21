import { FETCH_ADMIN_EVENTS, FETCH_ADMIN_EVENTS_SUCCESS, FETCH_ADMIN_EVENTS_FAILURE } from '../actions/getAdminEvents'

let initialState = {
  isFetching: false,
  items: []
}

const adminEvents = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_EVENTS:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_ADMIN_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.events
      })
    case FETCH_ADMIN_EVENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}

export default adminEvents
