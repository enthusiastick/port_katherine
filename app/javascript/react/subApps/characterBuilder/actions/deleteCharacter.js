import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const DELETE_CHARACTER = 'DELETE_CHARACTER'
const DELETE_CHARACTER_SUCCESS = 'DELETE_CHARACTER_SUCCESS'
const DELETE_CHARACTER_FAILURE = 'DELETE_CHARACTER_FAILURE'

export {
  DELETE_CHARACTER,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_FAILURE
}

let fetchDeleteCharacter = () => {
  return {
    type: DELETE_CHARACTER
  }
}

let fetchDeleteCharacterSuccess = characters => {
  return {
    type: DELETE_CHARACTER_SUCCESS,
    characters
  }
}

let fetchDeleteCharacterFailure = () => {
  return {
    type: DELETE_CHARACTER_FAILURE
  }
}

let deleteCharacter = nonSequentialId => dispatch => {
  dispatch(fetchDeleteCharacter())
  return fetch(`${baseUrl}/api/v1/characters/${nonSequentialId}.json`, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(fetchDeleteCharacterSuccess(humps.camelizeKeys(data.characters)))
    }
    return data
  })
  .catch(errors => {
    dispatch(fetchDeleteCharacterFailure())
    throw errors
  })
}

export {
  deleteCharacter
}
