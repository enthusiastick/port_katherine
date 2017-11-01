import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_CHARACTER = 'FETCH_CHARACTER'
const FETCH_CHARACTER_SUCCESS = 'FETCH_CHARACTER_SUCCESS'
const FETCH_CHARACTER_FAILURE = 'FETCH_CHARACTER_FAILURE'

export {
  FETCH_CHARACTER,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE
}

let fetchCharacter = () => {
  return {
    type: FETCH_CHARACTER
  }
}

let fetchCharacterSuccess = character => {
  return {
    type: FETCH_CHARACTER_SUCCESS,
    character
  }
}

let fetchCharacterFailure = () => {
  return {
    type: FETCH_CHARACTER_FAILURE
  }
}

let getCharacter = id => dispatch => {
  dispatch(fetchCharacter())
  return fetch(`${baseUrl}/api/v1/characters/${id}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchCharacterSuccess(humps.camelizeKeys(data.character))) })
  .catch(error => {
    dispatch(fetchCharacterFailure())
  })
}

export {
  getCharacter
}
