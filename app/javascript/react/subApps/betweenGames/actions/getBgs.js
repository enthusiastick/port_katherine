import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const GET_BGS = 'GET_BGS'
const GET_BGS_SUCCESS = 'GET_BGS_SUCCESS'
const GET_BGS_FAILURE = 'GET_BGS_FAILURE'

export {
  GET_BGS,
  GET_BGS_SUCCESS,
  GET_BGS_FAILURE
}

const fetchBgs = () => {
  return {
    type: GET_BGS
  }
}

const getBgsSuccess = result => {
  return {
    type: GET_BGS_SUCCESS,
    result
  }
}

const getBgsFailure = () => {
  return {
    type: GET_BGS_FAILURE
  }
}

const getBgs = id => dispatch => {
  dispatch(fetchBgs())
  return fetch(`${baseUrl}/api/v1/between_games/${id}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getBgsSuccess(result))
  })
  .catch(error => { dispatch(getBgsFailure()) })
}

export {
  getBgs
}
