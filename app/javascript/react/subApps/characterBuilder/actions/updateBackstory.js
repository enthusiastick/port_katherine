import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

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
    if (data.error) {
      throw data.error
    }

    const camelizedData = humps.camelizeKeys(data)
    return camelizedData
  })
  .catch(errors => {
    dispatch(updateBackstoryFailure())
    throw errors
  })
}

export {
  updateBackstory
}
