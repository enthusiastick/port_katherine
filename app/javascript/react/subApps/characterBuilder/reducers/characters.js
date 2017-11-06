import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE
} from '../actions/getCharacter'

import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE
} from '../actions/getCharacters'

import {
  FETCH_EDIT_CHARACTER,
  FETCH_EDIT_CHARACTER_SUCCESS,
  FETCH_EDIT_CHARACTER_FAILURE
} from '../actions/editCharacter'

import {
  CREATE_CHARACTER_SUCCESS
} from '../actions/createCharacter'

let initialState = {
  isFetching: false,
  edit: {},
  index: [],
  show: {}
}

const characters = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CHARACTER:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        show: action.character
      })
    case FETCH_CHARACTER_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    case FETCH_CHARACTERS:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_CHARACTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        index: action.characters
      })
    case FETCH_CHARACTERS_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    case FETCH_EDIT_CHARACTER:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_EDIT_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        edit: action.character
      })
    case FETCH_EDIT_CHARACTER_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    case CREATE_CHARACTER_SUCCESS:
      let newCharacterIndex = {
        id: action.character.id,
        name: action.character.name
      }
      return Object.assign({}, state, {
        index: state.index.concat(newCharacterIndex),
        show: action.character
      })
    default:
      return state
  }
}

export default characters
