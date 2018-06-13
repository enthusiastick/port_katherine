import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_EVENT_MERCHANTS = 'GET_ADMIN_EVENT_MERCHANTS'
const GET_ADMIN_EVENT_MERCHANTS_SUCCESS = 'GET_ADMIN_EVENT_MERCHANTS_SUCCESS'
const GET_ADMIN_EVENT_MERCHANTS_FAILURE = 'GET_ADMIN_EVENT_MERCHANTS_FAILURE'

export {
  GET_ADMIN_EVENT_MERCHANTS,
  GET_ADMIN_EVENT_MERCHANTS_SUCCESS,
  GET_ADMIN_EVENT_MERCHANTS_FAILURE
}

const fetchAdminEventMerchants = () => {
  return {
    type: GET_ADMIN_EVENT_MERCHANTS
  }
}

const getAdminEventMerchantsSuccess = merchants => {
  return {
    type: GET_ADMIN_EVENT_MERCHANTS_SUCCESS,
    merchants
  }
}

const getAdminEventMerchantsFailure = () => {
  return {
    type: GET_ADMIN_EVENT_MERCHANTS_FAILURE
  }
}

const getAdminEventMerchants = slug => dispatch => {
  dispatch(fetchAdminEventMerchants())
  return fetch(`${baseUrl}/api/v1/admin/events/${slug}/merchants.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminEventMerchantsSuccess(result))
  })
  .catch(error => {
    dispatch(getAdminEventMerchantsFailure())
  })
}

export {
  getAdminEventMerchants
}
