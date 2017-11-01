import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_CHARACTERS = 'FETCH_CHARACTERS'
const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS'
const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE'

export {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE
}

let fetchCharacters = () => {
  return {
    type: FETCH_CHARACTERS
  }
}

let fetchCharactersSuccess = characters => {
  return {
    type: FETCH_CHARACTERS_SUCCESS,
    characters
  }
}

let fetchCharactersFailure = () => {
  return {
    type: FETCH_CHARACTERS_FAILURE
  }
}

let getCharacters = () => dispatch => {
  dispatch(fetchCharacters())
  return fetch(`${baseUrl}/api/v1/characters.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchCharactersSuccess(humps.camelizeKeys(data.characters))) })
  .catch(error => {
    dispatch(fetchCharactersFailure())
  })
}

export {
  getCharacters
}
