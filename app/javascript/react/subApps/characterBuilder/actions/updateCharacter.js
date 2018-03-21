import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const UPDATE_CHARACTER = 'UPDATE_CHARACTER'
const UPDATE_CHARACTER_SUCCESS = 'UPDATE_CHARACTER_SUCCESS'
const UPDATE_CHARACTER_FAILURE = 'UPDATE_CHARACTER_FAILURE'

export {
  UPDATE_CHARACTER,
  UPDATE_CHARACTER_SUCCESS,
  UPDATE_CHARACTER_FAILURE
}

let fetchUpdateCharacter = () => {
  return {
    type: UPDATE_CHARACTER
  }
}

let updateCharacterSuccess = character => {
  return {
    type: UPDATE_CHARACTER_SUCCESS,
    character
  }
}

let updateCharacterFailure = () => {
  return {
    type: UPDATE_CHARACTER_FAILURE
  }
}

let updateCharacter = values => dispatch => {
  dispatch(fetchUpdateCharacter())
  let payload = JSON.stringify(humps.decamelizeKeys({character: values}))
  return fetch(`${baseUrl}/api/v1/characters/${values.id}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(updateCharacterSuccess(humps.camelizeKeys(data.character)))
      dispatch(clearNotices())
      dispatch(flashNotice({ success: `${data.character.name} updated successfully.` }))
      dispatch(push(`/characters/${data.character.id}`))
    }
    return data
  })
  .catch(errors => {
    dispatch(updateCharacterFailure())
    throw errors
  })
}

export {
  updateCharacter
}
