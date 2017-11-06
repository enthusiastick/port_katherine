import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const CREATE_CHARACTER = 'CREATE_CHARACTER'
const CREATE_CHARACTER_SUCCESS = 'CREATE_CHARACTER_SUCCESS'
const CREATE_CHARACTER_FAILURE = 'CREATE_CHARACTER_FAILURE'

export {
  CREATE_CHARACTER,
  CREATE_CHARACTER_SUCCESS,
  CREATE_CHARACTER_FAILURE
}

let fetchCreateCharacter = () => {
  return {
    type: CREATE_CHARACTER
  }
}

let createCharacterSuccess = character => {
  return {
    type: CREATE_CHARACTER_SUCCESS,
    character
  }
}

let createCharacterFailure = () => {
  return {
    type: CREATE_CHARACTER_FAILURE
  }
}

let createCharacter = values => dispatch => {
  dispatch(fetchCreateCharacter())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/characters.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(createCharacterSuccess(humps.camelizeKeys(data.character)))
      dispatch(clearNotices())
      dispatch(flashNotice({ success: `${data.character.name} created successfully.` }))
      dispatch(push(`/characters/${data.character.id}/edit`))
    }
    return data
  })
  .catch(errors => {
    dispatch(createCharacterFailure())
    throw errors
  })
}

export {
  createCharacter
}
