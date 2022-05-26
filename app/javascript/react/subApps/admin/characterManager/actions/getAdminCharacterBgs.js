import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl.js'

const GET_ADMIN_CHARACTER_BGS = 'GET_ADMIN_CHARACTER_BGS'
const GET_ADMIN_CHARACTER_BGS_SUCCESS = 'GET_ADMIN_CHARACTER_BGS_SUCCESS'
const GET_ADMIN_CHARACTER_BGS_FAILURE = 'GET_ADMIN_CHARACTER_BGS_FAILURE'

export {
  GET_ADMIN_CHARACTER_BGS,
  GET_ADMIN_CHARACTER_BGS_SUCCESS,
  GET_ADMIN_CHARACTER_BGS_FAILURE
}

const fetchAdminCharacterBgs = () => ({
  type: GET_ADMIN_CHARACTER_BGS
})

const getAdminCharacterBgsSuccess = payload => ({
  type: GET_ADMIN_CHARACTER_BGS_SUCCESS,
  payload
})

const getAdminCharacterBgsFailure = () => ({
  type: GET_ADMIN_CHARACTER_BGS_FAILURE
})

const getAdminCharacterBgs = characterId => dispatch => {
  dispatch(fetchAdminCharacterBgs())
  return fetch(`${baseUrl}/api/v1/admin/characters/${characterId}/character_bgs.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminCharacterBgsSuccess(result))
  })
  .catch(error => { dispatch(getAdminCharacterBgsFailure()) })
}

export {
  getAdminCharacterBgs
}
