import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_TALLIES = 'FETCH_TALLIES'
const FETCH_TALLIES_SUCCESS = 'FETCH_TALLIES_SUCCESS'
const FETCH_TALLIES_FAILURE = 'FETCH_TALLIES_FAILURE'

export {
  FETCH_TALLIES,
  FETCH_TALLIES_SUCCESS,
  FETCH_TALLIES_FAILURE
}

let fetchTallies = () => {
  return {
    type: FETCH_TALLIES
  }
}

let fetchTalliesSuccess = (tallies, name) => {
  return {
    type: FETCH_TALLIES_SUCCESS,
    tallies,
    name
  }
}

let fetchTalliesFailure = () => {
  return {
    type: FETCH_TALLIES_FAILURE
  }
}

let getTallies = id => dispatch => {
  dispatch(fetchTallies())
  return fetch(`${baseUrl}/api/v1/characters/${id}/tallies.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchTalliesSuccess(humps.camelizeKeys(data.tallies), data.meta)) })
  .catch(error => {
    dispatch(fetchTalliesFailure())
  })
}

export {
  getTallies
}
