import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const DELETE_REGISTRATION_REQUEST = 'DELETE_REGISTRATION_REQUEST'
const DELETE_REGISTRATION_REQUEST_SUCCESS = 'DELETE_REGISTRATION_REQUEST_SUCCESS'
const DELETE_REGISTRATION_REQUEST_FAILURE = 'DELETE_REGISTRATION_REQUEST_FAILURE'

let deleteRegistrationRequest = () => {
  return {
    type: DELETE_REGISTRATION_REQUEST
  }
}

let deleteRegistrationRequestSuccess = event => {
  return {
    type: DELETE_REGISTRATION_REQUEST_SUCCESS,
    event
  }
}

let deleteRegistrationRequestFailure = () => {
  return {
    type: DELETE_REGISTRATION_REQUEST_FAILURE
  }
}

let deleteRegistration = (bookingId) => dispatch => {
  dispatch(deleteRegistrationRequest())
  return fetch(`${baseUrl}/api/v1/bookings/${bookingId}.json`, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(deleteRegistrationRequestSuccess(humps.camelizeKeys(data.event)))
    }
    return data
  })
  .catch(errors => {
    dispatch(deleteRegistrationRequestFailure())
    throw errors
  })
}

export {
  DELETE_REGISTRATION_REQUEST,
  DELETE_REGISTRATION_REQUEST_SUCCESS,
  DELETE_REGISTRATION_REQUEST_FAILURE
}

export {
  deleteRegistrationRequest,
  deleteRegistrationRequestSuccess,
  deleteRegistrationRequestFailure,
  deleteRegistration
}
