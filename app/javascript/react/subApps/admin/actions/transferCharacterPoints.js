import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const TRANSFER_CHARACTER_POINTS = 'TRANSFER_CHARACTER_POINTS'
const TRANSFER_CHARACTER_POINTS_SUCCESS = 'TRANSFER_CHARACTER_POINTS_SUCCESS'
const TRANSFER_CHARACTER_POINTS_FAILURE = 'TRANSFER_CHARACTER_POINTS_FAILURE'

export {
  TRANSFER_CHARACTER_POINTS,
  TRANSFER_CHARACTER_POINTS_SUCCESS,
  TRANSFER_CHARACTER_POINTS_FAILURE
}

const fetchTransferCP = () => ({
  type: TRANSFER_CHARACTER_POINTS
})

const transferCPSuccess = payload => ({
  type: TRANSFER_CHARACTER_POINTS_SUCCESS,
  payload
})

const transferCPFailure = () => ({
  type: TRANSFER_CHARACTER_POINTS_FAILURE
})

const transferCP = values => dispatch => {
  dispatch(fetchTransferCP())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/transfer_character_points.json`, {
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
      dispatch(transferCPSuccess(humps.decamelizeKeys(data)))
    }
    return data
  })
  .catch(errors => {
    dispatch(transferCPFailure())
    throw errors
  })
}

export {
  transferCP
}
