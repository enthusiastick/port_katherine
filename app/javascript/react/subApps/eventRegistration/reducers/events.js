import { FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE } from '../actions/getEvents'

let initialState = {
  isFetching: false,
  items: []
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.events
      })
    case FETCH_EVENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}

export default events
