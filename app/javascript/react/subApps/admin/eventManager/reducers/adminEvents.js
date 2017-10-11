import {
  FETCH_ADMIN_EVENTS,
  FETCH_ADMIN_EVENTS_SUCCESS,
  FETCH_ADMIN_EVENTS_FAILURE
} from '../actions/getAdminEvents'

import { CREATE_ADMIN_EVENT_SUCCESS } from '../actions/createAdminEvent'
import { DELETE_ADMIN_EVENT_REQUEST_SUCCESS } from '../actions/deleteAdminEvent'
import { UPDATE_ADMIN_EVENT_SUCCESS } from '../actions/updateAdminEvent'

let initialState = {
  isFetching: false,
  items: []
}

const adminEvents = (state = initialState, action) => {
  let newAdminEvents, patchedEventIndex, removedAdminEvents

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
    case CREATE_ADMIN_EVENT_SUCCESS:
      newAdminEvents = [action.newEvent].concat(state.items)
      return Object.assign({}, state, { items: newAdminEvents })
    case DELETE_ADMIN_EVENT_REQUEST_SUCCESS:
      removedAdminEvents = state.items.filter(event => {
        return event.id !== action.event.id
      })
      return Object.assign({}, state, { items: removedAdminEvents })
    case UPDATE_ADMIN_EVENT_SUCCESS:
      newAdminEvents = state.items
      patchedEventIndex = newAdminEvents.findIndex(event => {
        if (event.id === action.event.id) { return event }
      })
      newAdminEvents.splice(patchedEventIndex, 1, action.event)
      return Object.assign({}, state, { items: newAdminEvents })
    default:
      return state
  }
}

export default adminEvents
