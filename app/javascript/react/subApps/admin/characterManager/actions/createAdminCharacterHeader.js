import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const CREATE_ADMIN_CHARACTER_HEADER = 'CREATE_ADMIN_CHARACTER_HEADER'
const CREATE_ADMIN_CHARACTER_HEADER_SUCCESS = 'CREATE_ADMIN_CHARACTER_HEADER_SUCCESS'
const CREATE_ADMIN_CHARACTER_HEADER_FAILURE = 'CREATE_ADMIN_CHARACTER_HEADER_FAILURE'

export {
  CREATE_ADMIN_CHARACTER_HEADER,
  CREATE_ADMIN_CHARACTER_HEADER_SUCCESS,
  CREATE_ADMIN_CHARACTER_HEADER_FAILURE
}

const fetchCreateAdminCharacterHeader = () => ({
  type: CREATE_ADMIN_CHARACTER_HEADER
})

const createAdminCharacterHeaderSuccess = characterHeaders => ({
  type: CREATE_ADMIN_CHARACTER_HEADER_SUCCESS,
  characterHeaders
})

const createAdminCharacterHeaderFailure = errors => ({
  type: CREATE_ADMIN_CHARACTER_HEADER_FAILURE,
  errors
})

const createAdminCharacterHeader = values => dispatch => {
  const params = {
    characterHeader: {
      characterId: values.characterId,
      cost: values.cost,
      headers: values.headers.map(header => header.value)
    }
  }
  const payload = JSON.stringify(humps.decamelizeKeys(params))
  return fetch(`${baseUrl}/api/v1/admin/character_headers.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createAdminCharacterHeaderSuccess(result.characterHeaders))
  })
  .catch(error => {
    dispatch(createAdminCharacterHeaderFailure(error))
  })
}

export {
  createAdminCharacterHeader
}
