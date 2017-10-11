import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from '../actions/getEvents'

import {
  FETCH_CREATE_SESSION_SUCCESS
} from '../../userAuthenticator/actions/createSession'

import {
  FETCH_DESTROY_SESSION_SUCCESS
} from '../../userAuthenticator/actions/destroySession'

import {
  CREATE_REGISTRATION_SUCCESS
} from '../actions/createRegistration'

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
    case FETCH_CREATE_SESSION_SUCCESS:
      return initialState
    case FETCH_DESTROY_SESSION_SUCCESS:
      return initialState
    case CREATE_REGISTRATION_SUCCESS:
      let newEvents = state.items
      let firstPatchedEventIndex = newEvents.findIndex(event => {
        if (event.id === newEvents[0].id) { return event }
      })
      newEvents.splice(firstPatchedEventIndex, newEvents.length, newEvents)
      return Object.assign({}, state, { items: newEvents })
    default:
      return state
  }
}

export default events
