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
  DELETE_CHARACTER,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_FAILURE
} from '../actions/deleteCharacter'

import {
  FETCH_TALLIES_SUCCESS
} from '../../../sharedResources/actions/getTallies'

import {
  CREATE_CHARACTER_SUCCESS
} from '../actions/createCharacter'

import {
  UPDATE_BACKSTORY_SUCCESS
} from '../actions/updateBackstory'

import {
  UPDATE_CHARACTER_SUCCESS,
  UPDATE_CHARACTER_FAILURE
} from '../actions/updateCharacter'

import {
  UPDATE_DEFAULT_CHARACTER_SUCCESS
} from '../actions/updateDefaultCharacter'

let initialState = {
  isFetching: false,
  defaultCharacterId: null,
  edit: {
    headers: [],
    open: []
  },
  index: [],
  playerCpAvailable: null,
  show: {},
  tallies: {
    items: [],
    meta: {}
  },
  userTallies: []
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
        defaultCharacterId: action.payload.meta.defaultCharacterId,
        playerCpAvailable: action.payload.meta.playerCpAvailable,
        userTallies: action.payload.meta.userTallies,
        index: action.payload.characters
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
    case DELETE_CHARACTER:
      return Object.assign({}, state, { isFetching: true })
    case DELETE_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        index: action.characters
      })
    case DELETE_CHARACTER_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    case FETCH_TALLIES_SUCCESS:
      return Object.assign({}, state, { tallies: { meta: action.meta, items: action.tallies } })
    case CREATE_CHARACTER_SUCCESS:
      let newCharacterIndex = {
        id: action.character.id,
        name: action.character.name
      }
      return Object.assign({}, state, {
        index: state.index.concat(newCharacterIndex),
        show: action.character
      })
    case UPDATE_BACKSTORY_SUCCESS:
      let updatedEdit = Object.assign({}, state.edit, { backstory: action. backstory })
      return Object.assign({}, state, {
        edit: updatedEdit
      })
    case UPDATE_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        edit: {
          headers: [],
          open: []
        },
        show: action.character
      })
    case UPDATE_DEFAULT_CHARACTER_SUCCESS:
      return Object.assign({}, state, {
        defaultCharacterId: action.defaultCharacterId
      })
    default:
      return state
  }
}

export default characters
