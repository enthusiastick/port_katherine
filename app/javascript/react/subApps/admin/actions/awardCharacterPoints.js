import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const AWARD_CHARACTER_POINTS = 'AWARD_CHARACTER_POINTS'
const AWARD_CHARACTER_POINTS_SUCCESS = 'AWARD_CHARACTER_POINTS_SUCCESS'
const AWARD_CHARACTER_POINTS_FAILURE = 'AWARD_CHARACTER_POINTS_FAILURE'

export {
  AWARD_CHARACTER_POINTS,
  AWARD_CHARACTER_POINTS_SUCCESS,
  AWARD_CHARACTER_POINTS_FAILURE
}

let fetchAwardCP = () => {
  return {
    type: AWARD_CHARACTER_POINTS
  }
}

let awardCPSuccess = payload => {
  return {
    type: AWARD_CHARACTER_POINTS_SUCCESS,
    payload
  }
}

let awardCPFailure = () => {
  return {
    type: AWARD_CHARACTER_POINTS_FAILURE
  }
}

let awardCP = values => dispatch => {
  dispatch(fetchAwardCP())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/character_points.json`, {
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
      dispatch(awardCPSuccess(humps.camelizeKeys(data)))
      dispatch(clearNotices())
      dispatch(flashNotice({ success: 'CP awarded successfully.' }))
    }
    return data
  })
  .catch(errors => {
    dispatch(awardCPFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
    throw errors
  })
}

export {
  awardCP
}
