import {
  CREATE_ADMIN_CHARACTER_HEADER_SUCCESS
} from '../actions/createAdminCharacterHeader'

import {
  CREATE_ADMIN_CHARACTER_SKILL_SUCCESS
} from '../actions/createAdminCharacterSkill'

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

import {
  FETCH_ADMIN_BACKSTORIES_SUCCESS
} from '../actions/getAdminBackstories'

import {
  UPDATE_CHARACTER_SUCCESS
} from '../../../characterBuilder/actions/updateCharacter'

import {
  UPDATE_ADMIN_CHARACTER_SKILL_LOCK,
  UPDATE_ADMIN_CHARACTER_SKILL_LOCK_SUCCESS,
  UPDATE_ADMIN_CHARACTER_SKILL_LOCK_FAILURE
} from '../actions/updateAdminCharacterSkillLock'

let initialState = {
  isFetching: false,
  isLocking: false,
  backstories: {
    meta: {},
    items: []
  },
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
    case FETCH_ADMIN_BACKSTORIES_SUCCESS:
      return Object.assign({}, state, { backstories: { meta: action.payload.meta, items: action.payload.backstories } })
    case UPDATE_CHARACTER_SUCCESS:
      return {
        ...state,
        show: action.character
      }
    case CREATE_ADMIN_CHARACTER_HEADER_SUCCESS:
      return {
        ...state,
        show: action.character
      }
    case CREATE_ADMIN_CHARACTER_SKILL_SUCCESS:
      return {
        ...state,
        show: action.character
      }
    case UPDATE_ADMIN_CHARACTER_SKILL_LOCK:
      return {
        ...state,
        isLocking: true
      }
    case UPDATE_ADMIN_CHARACTER_SKILL_LOCK_SUCCESS:
      return {
        ...state,
        isLocking: false
      }
    case UPDATE_ADMIN_CHARACTER_SKILL_LOCK_FAILURE:
      return {
        ...state,
        isLocking: false
      }
    default:
      return state
  }
}

export default adminCharacters
