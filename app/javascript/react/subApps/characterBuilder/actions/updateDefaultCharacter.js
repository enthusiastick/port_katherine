import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const UPDATE_DEFAULT_CHARACTER = 'UPDATE_DEFAULT_CHARACTER'
const UPDATE_DEFAULT_CHARACTER_SUCCESS = 'UPDATE_DEFAULT_CHARACTER_SUCCESS'
const UPDATE_DEFAULT_CHARACTER_FAILURE = 'UPDATE_DEFAULT_CHARACTER_FAILURE'

export {
  UPDATE_DEFAULT_CHARACTER,
  UPDATE_DEFAULT_CHARACTER_SUCCESS,
  UPDATE_DEFAULT_CHARACTER_FAILURE
}

let fetchUpdateDefaultCharacter = () => {
  return {
    type: UPDATE_DEFAULT_CHARACTER
  }
}

let updateDefaultCharacterSuccess = defaultCharacterId => {
  return {
    type: UPDATE_DEFAULT_CHARACTER_SUCCESS,
    defaultCharacterId
  }
}

let updateDefaultCharacterFailure = () => {
  return {
    type: UPDATE_DEFAULT_CHARACTER_FAILURE
  }
}

let updateDefaultCharacter = characterId => dispatch => {
  dispatch(fetchUpdateDefaultCharacter())
  return fetch(`${baseUrl}/api/v1/default_characters/${characterId}.json`, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const camelizedData = humps.camelizeKeys(data)
    if (data.error) {
      throw data.error
    } else {
      dispatch(updateDefaultCharacterSuccess(camelizedData.defaultCharacterId))
      return camelizedData
    }
  })
  .catch(errors => {
    dispatch(updateDefaultCharacterFailure())
  })
}

export {
  updateDefaultCharacter
}
