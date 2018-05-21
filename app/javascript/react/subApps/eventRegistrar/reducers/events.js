import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from '../actions/getEvents'

import {
  FETCH_CREATE_SESSION_SUCCESS
} from '../../userAuthenticator/actions/createSession'

import {
  CREATE_REGISTRATION_SUCCESS
} from '../actions/createRegistration'

import {
  DELETE_REGISTRATION_REQUEST_SUCCESS
} from '../actions/deleteRegistration'

import {
  UPDATE_BOOKING_CHARACTER,
  UPDATE_BOOKING_CHARACTER_SUCCESS,
  UPDATE_BOOKING_CHARACTER_FAILURE
} from '../actions/updateBookingCharacter'

let initialState = {
  hasUpdatedCharacter: false,
  isFetching: false,
  items: []
}

const events = (state = initialState, action) => {
  let updatedEvents, updatedEventSlugs

  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.events
      }
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case FETCH_CREATE_SESSION_SUCCESS:
      return initialState
    case CREATE_REGISTRATION_SUCCESS:
      updatedEventSlugs = action.events.map(event => {
        return event.slug
      })
      updatedEvents = state.items.map(event => {
        if (updatedEventSlugs.includes(event.slug)) {
          const foundEvent = action.events.find(newEvent => {
            return (event.slug === newEvent.slug)
          })
          return { ...event, ...foundEvent}
        }
        return event
      })
      return {
        ...state,
        items: updatedEvents
      }
    case DELETE_REGISTRATION_REQUEST_SUCCESS:
      updatedEvents = state.items.map(event => {
        if (event.slug === action.event.slug) {
          return { ...event, ...action.event }
        }
        return event
      })
      return {
        ...state,
        items: updatedEvents
      }
    case UPDATE_BOOKING_CHARACTER:
      return {
        ...state,
        hasUpdatedCharacter: false
      }
    case UPDATE_BOOKING_CHARACTER_SUCCESS:
      updatedEvents = state.items.map(event => {
        if (event.slug === action.event.slug) {
          return { ...event, ...action.event }
        }
        return event
      })
      return {
        ...state,
        hasUpdatedCharacter: true,
        items: updatedEvents
      }
    case UPDATE_BOOKING_CHARACTER_FAILURE:
      return {
        ...state,
        hasUpdatedCharacter: false
      }
    default:
      return state
  }
}

export default events
