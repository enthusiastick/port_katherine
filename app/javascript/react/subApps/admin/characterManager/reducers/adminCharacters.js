import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE
} from '../../../characterBuilder/actions/getCharacter'

import {
  FETCH_ADMIN_CHARACTERS,
  FETCH_ADMIN_CHARACTERS_SUCCESS,
  FETCH_ADMIN_CHARACTERS_FAILURE
} from '../actions/getAdminCharacters'

let initialState = {
  isFetching: false,
  index: [],
  show: {}
}

const adminCharacters = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTER:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        show: action.character
      })
    case FETCH_CHARACTER_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    case FETCH_ADMIN_CHARACTERS:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_ADMIN_CHARACTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        index: action.characters
      })
    case FETCH_ADMIN_CHARACTERS_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}

export default adminCharacters
