import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const UPDATE_BOOKING_CHARACTER = 'UPDATE_BOOKING_CHARACTER'
const UPDATE_BOOKING_CHARACTER_SUCCESS = 'UPDATE_BOOKING_CHARACTER_SUCCESS'
const UPDATE_BOOKING_CHARACTER_FAILURE = 'UPDATE_BOOKING_CHARACTER_FAILURE'

export {
  UPDATE_BOOKING_CHARACTER,
  UPDATE_BOOKING_CHARACTER_SUCCESS,
  UPDATE_BOOKING_CHARACTER_FAILURE
}

const fetchUpdateBookingCharacter = () => {
  return {
    type: UPDATE_BOOKING_CHARACTER
  }
}

const updateBookingCharacterSuccess = event => {
  return {
    type: UPDATE_BOOKING_CHARACTER_SUCCESS,
    event
  }
}

const updateBookingCharacterFailure = () => {
  return {
    type: UPDATE_BOOKING_CHARACTER_FAILURE
  }
}

const updateBookingCharacter = values => dispatch => {
  dispatch(fetchUpdateBookingCharacter())
  return fetch(`${baseUrl}/api/v1/events/${values.eventSlug}/booking_characters/${values.characterId}.json`, {
      credentials: 'same-origin',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      const response = humps.camelizeKeys(data)
      dispatch(updateBookingCharacterSuccess(response.event))
      return response
    }
  })
  .catch(errors => {
    dispatch(updateBookingCharacterFailure())
    throw errors
  })
}

export {
  updateBookingCharacter
}
