import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const UPDATE_BACKSTORY = 'UPDATE_BACKSTORY'
const UPDATE_BACKSTORY_SUCCESS = 'UPDATE_BACKSTORY_SUCCESS'
const UPDATE_BACKSTORY_FAILURE = 'UPDATE_BACKSTORY_FAILURE'

export {
  UPDATE_BACKSTORY,
  UPDATE_BACKSTORY_SUCCESS,
  UPDATE_BACKSTORY_FAILURE
}

let fetchUpdateBackstory = () => {
  return {
    type: UPDATE_BACKSTORY
  }
}

let updateBackstorySuccess = backstory => {
  return {
    type: UPDATE_BACKSTORY_SUCCESS,
    backstory
  }
}

let updateBackstoryFailure = () => {
  return {
    type: UPDATE_BACKSTORY_FAILURE
  }
}

let updateBackstory = values => dispatch => {
  dispatch(fetchUpdateBackstory())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/backstories.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const camelizedData = humps.camelizeKeys(data)
    if (data.error) {
      throw data.error
    } else {
      dispatch(updateBackstorySuccess(camelizedData.backstory))
      dispatch(clearNotices())
      dispatch(flashNotice({ success: 'Backstory updated successfully.' }))
      dispatch(push(`/characters/${camelizedData.characterId}/edit`))
    }
    return camelizedData
  })
  .catch(errors => {
    dispatch(updateBackstoryFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem updating your backstory.' }))
    throw errors
  })
}

export {
  updateBackstory
}
