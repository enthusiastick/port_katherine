import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const DESTROY_CHECK_IN =  'DESTROY_CHECK_IN'
const DESTROY_CHECK_IN_SUCCESS =  'DESTROY_CHECK_IN_SUCCESS'
const DESTROY_CHECK_IN_FAILURE =  'DESTROY_CHECK_IN_FAILURE'

export {
  DESTROY_CHECK_IN,
  DESTROY_CHECK_IN_SUCCESS,
  DESTROY_CHECK_IN_FAILURE
}

const fetchDestroyCheckIn = () => {
  return {
    type: DESTROY_CHECK_IN
  }
}

const fetchDestroyCheckInSuccess = event => {
  return {
    type: DESTROY_CHECK_IN_SUCCESS,
    event
  }
}

const fetchDestroyCheckInFailure = () => {
  return {
    type: DESTROY_CHECK_IN_FAILURE
  }
}

const deleteCheckIn = values => dispatch => {
  dispatch(fetchDestroyCheckIn())
  return fetch(`${baseUrl}/api/v1/admin/bookings/${values.bookingId}/check_ins/${values.id}.json`, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchDestroyCheckInSuccess(humps.camelizeKeys(data.event))) })
  .catch(error => { dispatch(fetchDestroyCheckInFailure()) })
}

export {
  deleteCheckIn
}
