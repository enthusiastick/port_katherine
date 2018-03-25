import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const FETCH_ADMIN_CHARACTERS = 'FETCH_ADMIN_CHARACTERS'
const FETCH_ADMIN_CHARACTERS_SUCCESS = 'FETCH_ADMIN_CHARACTERS_SUCCESS'
const FETCH_ADMIN_CHARACTERS_FAILURE = 'FETCH_ADMIN_CHARACTERS_FAILURE'

export {
  FETCH_ADMIN_CHARACTERS,
  FETCH_ADMIN_CHARACTERS_SUCCESS,
  FETCH_ADMIN_CHARACTERS_FAILURE
}

let fetchAdminCharacters = () => {
  return {
    type: FETCH_ADMIN_CHARACTERS
  }
}

let fetchAdminCharactersSuccess = characters => {
  return {
    type: FETCH_ADMIN_CHARACTERS_SUCCESS,
    characters
  }
}

let fetchAdminCharactersFailure = () => {
  return {
    type: FETCH_ADMIN_CHARACTERS_FAILURE
  }
}

let getAdminCharacters = () => dispatch => {
  dispatch(fetchAdminCharacters())
  return fetch(`${baseUrl}/api/v1/admin/characters.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchAdminCharactersSuccess(humps.camelizeKeys(data.characters))) })
  .catch(error => {
    dispatch(fetchAdminCharactersFailure())
  })
}

export {
  getAdminCharacters
}
