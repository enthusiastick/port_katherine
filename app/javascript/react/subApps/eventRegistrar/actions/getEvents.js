import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_EVENTS = 'FETCH_EVENTS'
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'

export { FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE }

let fetchEvents = () => {
  return {
    type: FETCH_EVENTS
  }
}

let fetchEventsSuccess = events => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    events
  }
}


let fetchEventsFailure = () => {
  return {
    type: FETCH_EVENTS_FAILURE
  }
}

let getEvents = () => dispatch => {
  dispatch(fetchEvents())
  return fetch(`${baseUrl}/api/v1/events.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    dispatch(fetchEventsSuccess(humps.camelizeKeys(data.events)))
    return data
  })
  .catch(error => {
    dispatch(fetchEventsFailure())
  })
}

export {
  fetchEvents,
  fetchEventsSuccess,
  fetchEventsFailure,
  getEvents
}
