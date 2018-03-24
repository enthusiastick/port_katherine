import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE
} from '../../../characterBuilder/actions/getCharacter'

let initialState = {
  isFetching: false,
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
    default:
      return state
  }
}

export default adminCharacters
