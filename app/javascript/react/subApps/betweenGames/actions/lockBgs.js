import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const LOCK_BGS = 'LOCK_BGS'
const LOCK_BGS_SUCCESS = 'LOCK_BGS_SUCCESS'
const LOCK_BGS_FAILURE = 'LOCK_BGS_FAILURE'

export {
  LOCK_BGS,
  LOCK_BGS_SUCCESS,
  LOCK_BGS_FAILURE
}

const fetchLockBgs = () => ({
  type: LOCK_BGS
})

const lockBgsSuccess = bgs => ({
  type: LOCK_BGS_SUCCESS,
  bgs
})

const lockBgsFailure = () => ({
  type: LOCK_BGS_FAILURE
})

const lockBgs = id => dispatch => {
  dispatch(fetchLockBgs())
  return fetch(`${baseUrl}/api/v1/between_games/${id}/locks.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(lockBgsSuccess(result.betweenGame))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Your BGS has been locked. Thank you!'}))
  })
  .catch(error => {
    dispatch(lockBgsFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  lockBgs
}
