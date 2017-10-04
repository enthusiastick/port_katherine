import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { getNonce } from './getNonce'

const CREATE_REGISTRATION = 'CREATE_REGISTRATION'
const CREATE_REGISTRATION_SUCCESS = 'CREATE_REGISTRATION_SUCCESS'
const CREATE_REGISTRATION_FAILURE = 'CREATE_REGISTRATION_FAILURE'

export { CREATE_REGISTRATION, CREATE_REGISTRATION_SUCCESS, CREATE_REGISTRATION_FAILURE }

let fetchCreateRegistration = () => {
  return {
    type: CREATE_REGISTRATION
  }
}

let fetchCreateRegistrationSuccess = registration => {
  return {
    type: CREATE_REGISTRATION_SUCCESS,
    registration
  }
}

let fetchCreateRegistrationFailure = () => {
  return {
    type: CREATE_REGISTRATION_FAILURE
  }
}

let createRegistration = values => dispatch => {
  return getNonce(values)
  .then(cc => {
    let valueSlice = (({ user, pass, userSelfReport }) => ({ user, pass, userSelfReport }))(values)
    valueSlice.payment = cc
    let payload = JSON.stringify(humps.decamelizeKeys(valueSlice))
    return fetch(`${baseUrl}/api/v1/bookings.json`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    })
  })
  .then(response => { return response.json() })
  .then(data => { console.log(data) })
}
export {
  fetchCreateRegistration,
  fetchCreateRegistrationSuccess,
  fetchCreateRegistrationFailure,
  createRegistration
}
