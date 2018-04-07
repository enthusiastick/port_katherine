import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const GET_NEXT_EVENT = 'GET_NEXT_EVENT'
const GET_NEXT_EVENT_SUCCESS = 'GET_NEXT_EVENT_SUCCESS'
const GET_NEXT_EVENT_FAILURE = 'GET_NEXT_EVENT_FAILURE'

export {
  GET_NEXT_EVENT,
  GET_NEXT_EVENT_SUCCESS,
  GET_NEXT_EVENT_FAILURE
}

const beginGettingNextEvent = () => {
  return {
    type: GET_NEXT_EVENT
  }
}

const getNextEventSuccess = nextEvent => {
  return {
    type: GET_NEXT_EVENT_SUCCESS,
    nextEvent
  }
}

const getNextEventFailure = () => {
  return {
    type: GET_NEXT_EVENT_FAILURE
  }
}

const getNextEvent = () => dispatch => {
  dispatch(beginGettingNextEvent())
  return fetch(`${baseUrl}/api/v1/events/next.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const camelizedData = humps.camelizeKeys(data)
    dispatch(getNextEventSuccess(camelizedData.nextEvent))
  })
  .catch(error => {
    dispatch(getNextEventFailure())
  })
}

export {
  getNextEvent
}
