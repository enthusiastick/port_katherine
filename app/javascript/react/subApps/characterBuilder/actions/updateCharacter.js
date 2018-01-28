import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

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

let updateCharacter = (values, dispatch) => {
  debugger
  dispatch(fetchUpdateCharacter())
}

export {
  updateCharacter
}
