import {
  FETCH_ADMIN_EVENTS,
  FETCH_ADMIN_EVENTS_SUCCESS,
  FETCH_ADMIN_EVENTS_FAILURE
} from '../actions/getAdminEvents'

import {
  FETCH_ADMIN_EVENT_ENVELOPES,
  FETCH_ADMIN_EVENT_ENVELOPES_SUCCESS,
  FETCH_ADMIN_EVENT_ENVELOPES_FAILURE
} from '../actions/getAdminEventEnvelopes'

import {
  GET_ADMIN_EVENT_HEADERS,
  GET_ADMIN_EVENT_HEADERS_SUCCESS,
  GET_ADMIN_EVENT_HEADERS_FAILURE
} from '../actions/getAdminEventHeaders'

import {
  GET_ADMIN_EVENT_PELS,
  GET_ADMIN_EVENT_PELS_SUCCESS,
  GET_ADMIN_EVENT_PELS_FAILURE
} from '../actions/getAdminEventPels'

import { CREATE_ADMIN_EVENT_SUCCESS } from '../actions/createAdminEvent'
import { DELETE_ADMIN_EVENT_REQUEST_SUCCESS } from '../actions/deleteAdminEvent'
import { UPDATE_ADMIN_EVENT_SUCCESS } from '../actions/updateAdminEvent'

import {
  CREATE_CHECK_IN,
  CREATE_CHECK_IN_SUCCESS,
  CREATE_CHECK_IN_FAILURE
} from '../actions/createCheckIn'

import {
  DESTROY_CHECK_IN,
  DESTROY_CHECK_IN_SUCCESS,
  DESTROY_CHECK_IN_FAILURE
} from '../actions/deleteCheckIn'

let initialState = {
  envelopes: { characters: [] },
  headers: { characters: [] },
  pels: { bookings: []},
  isFetching: false,
  isFetchingEnvelopes: false,
  isFetchingHeaders: false,
  isFetchingPels: false,
  items: []
}

const adminEvents = (state = initialState, action) => {
  let newAdminEvents, patchedEventIndex, removedAdminEvents, updatedAdminEvents

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
    case FETCH_ADMIN_EVENT_ENVELOPES:
      return { ...state, isFetchingEnvelopes: true }
    case FETCH_ADMIN_EVENT_ENVELOPES_SUCCESS:
      return { ...state, envelopes: action.envelopes, isFetchingEnvelopes: false }
    case FETCH_ADMIN_EVENT_ENVELOPES_FAILURE:
      return { ...state, isFetchingEnvelopes: false }
    case GET_ADMIN_EVENT_HEADERS:
      return { ...state, isFetchingHeaders: true }
    case GET_ADMIN_EVENT_HEADERS_SUCCESS:
      return {
        ...state,
        headers: action.characters,
        isFetchingHeaders: false
      }
      return state
    case GET_ADMIN_EVENT_HEADERS_FAILURE:
      return { ...state, isFetchingHeaders: false }
    case GET_ADMIN_EVENT_PELS:
      return { ...state, isFetchingPels: true }
    case GET_ADMIN_EVENT_PELS_SUCCESS:
      return { ...state, pels: action.pels, isFetchingPels: false }
    case GET_ADMIN_EVENT_PELS_FAILURE:
      return { ...state, isFetchingPels: false }
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
    case CREATE_CHECK_IN:
      return { ...state, isFetching: true }
    case CREATE_CHECK_IN_SUCCESS:
      updatedAdminEvents = state.items.map(event => {
        if (event.slug === action.event.slug) {
          return { ...event, ...action.event }
        }
        return event
      })
      return {
        ...state,
        isFetching: false,
        items: updatedAdminEvents
      }
    case CREATE_CHECK_IN_FAILURE:
      return { ...state, isFetching: true }
    case DESTROY_CHECK_IN:
      return { ...state, isFetching: true }
    case DESTROY_CHECK_IN_SUCCESS:
      updatedAdminEvents = state.items.map(event => {
        if (event.slug === action.event.slug) {
          return { ...event, ...action.event }
        }
        return event
      })
      return {
        ...state,
        isFetching: false,
        items: updatedAdminEvents
      }
    case DESTROY_CHECK_IN_FAILURE:
      return { ...state, isFetching: true }
    default:
      return state
  }
}

export default adminEvents
