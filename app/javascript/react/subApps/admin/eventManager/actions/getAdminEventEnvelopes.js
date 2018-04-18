import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const FETCH_ADMIN_EVENT_ENVELOPES = 'FETCH_ADMIN_EVENT_ENVELOPES'
const FETCH_ADMIN_EVENT_ENVELOPES_SUCCESS = 'FETCH_ADMIN_EVENT_ENVELOPES_SUCCESS'
const FETCH_ADMIN_EVENT_ENVELOPES_FAILURE = 'FETCH_ADMIN_EVENT_ENVELOPES_FAILURE'

export {
  FETCH_ADMIN_EVENT_ENVELOPES,
  FETCH_ADMIN_EVENT_ENVELOPES_SUCCESS,
  FETCH_ADMIN_EVENT_ENVELOPES_FAILURE
}

const fetchAdminEventEnvelopes = () => {
  return {
    type: FETCH_ADMIN_EVENT_ENVELOPES
  }
}

const fetchAdminEventEnvelopesSuccess = envelopes => {
  return {
    type: FETCH_ADMIN_EVENT_ENVELOPES_SUCCESS,
    envelopes
  }
}

const fetchAdminEventEnvelopesFailure = () => {
  return {
    type: FETCH_ADMIN_EVENT_ENVELOPES_FAILURE
  }
}

const getAdminEventEnvelopes = slug => dispatch => {
  dispatch(fetchAdminEventEnvelopes())
  return fetch(`${baseUrl}/api/v1/admin/events/${slug}/envelopes.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchAdminEventEnvelopesSuccess(humps.camelizeKeys(data).event)) })
  .catch(error => {
    dispatch(fetchAdminEventEnvelopesFailure())
  })
}

export {
  getAdminEventEnvelopes
}
