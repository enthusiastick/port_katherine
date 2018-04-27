import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const CREATE_CHECK_IN = 'CREATE_CHECK_IN'
const CREATE_CHECK_IN_SUCCESS = 'CREATE_CHECK_IN_SUCCESS'
const CREATE_CHECK_IN_FAILURE = 'CREATE_CHECK_IN_FAILURE'

export {
  CREATE_CHECK_IN,
  CREATE_CHECK_IN_SUCCESS,
  CREATE_CHECK_IN_FAILURE
}

const fetchCreateCheckIn = () => {
  return {
    type: CREATE_CHECK_IN
  }
}

const fetchCreateCheckInSuccess = event => {
  return {
    type: CREATE_CHECK_IN_SUCCESS,
    event
  }
}

const fetchCreateCheckInFailure = () => {
  return {
    type: CREATE_CHECK_IN_FAILURE
  }
}

const createCheckIn = values => dispatch => {
  dispatch(fetchCreateCheckIn())
  const payload = JSON.stringify(humps.decamelizeKeys({ checkIn: values }))
  return fetch(`${baseUrl}/api/v1/admin/bookings/${values.id}/check_ins.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchCreateCheckInSuccess(humps.camelizeKeys(data.event))) })
  .catch(error => { dispatch(fetchCreateCheckInFailure()) })
}

export {
  createCheckIn
}
