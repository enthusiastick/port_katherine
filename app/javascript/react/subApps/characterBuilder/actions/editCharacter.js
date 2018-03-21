import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_EDIT_CHARACTER = 'FETCH_EDIT_CHARACTER'
const FETCH_EDIT_CHARACTER_SUCCESS = 'FETCH_EDIT_CHARACTER_SUCCESS'
const FETCH_EDIT_CHARACTER_FAILURE = 'FETCH_EDIT_CHARACTER_FAILURE'

export {
  FETCH_EDIT_CHARACTER,
  FETCH_EDIT_CHARACTER_SUCCESS,
  FETCH_EDIT_CHARACTER_FAILURE
}

let fetchEditCharacter = () => {
  return {
    type: FETCH_EDIT_CHARACTER
  }
}

let fetchEditCharacterSuccess = character => {
  return {
    type: FETCH_EDIT_CHARACTER_SUCCESS,
    character
  }
}

let fetchEditCharacterFailure = () => {
  return {
    type: FETCH_EDIT_CHARACTER_FAILURE
  }
}

let editCharacter = id => dispatch => {
  dispatch(fetchEditCharacter())
  return fetch(`${baseUrl}/api/v1/characters/${id}/edit.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchEditCharacterSuccess(humps.camelizeKeys(data.character))) })
  .catch(error => {
    dispatch(fetchEditCharacterFailure())
  })
}

export {
  editCharacter
}
