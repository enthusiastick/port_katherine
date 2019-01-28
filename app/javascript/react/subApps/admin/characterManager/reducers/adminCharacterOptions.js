import {
  GET_ADMIN_AVAILABLE_HEADERS,
  GET_ADMIN_AVAILABLE_HEADERS_SUCCESS,
  GET_ADMIN_AVAILABLE_HEADERS_FAILURE
} from '../actions/getAdminCharacterAvailableHeaders'

import {
  GET_ADMIN_AVAILABLE_SKILLS,
  GET_ADMIN_AVAILABLE_SKILLS_SUCCESS,
  GET_ADMIN_AVAILABLE_SKILLS_FAILURE
} from '../actions/getAdminCharacterAvailableSkills'

import {
  CREATE_ADMIN_CHARACTER_HEADER_SUCCESS
} from '../actions/createAdminCharacterHeader'

import {
  CREATE_ADMIN_CHARACTER_SKILL_SUCCESS
} from '../actions/createAdminCharacterSkill'

const initialState = {
  isFetching: false,
  headers: { items: [], meta: {} },
  skills: { items: [], meta: {} }
}

const adminCharacterOptions = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_AVAILABLE_HEADERS:
      return { ...state, isFetching: true }
    case GET_ADMIN_AVAILABLE_HEADERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        headers: {
          items: action.payload.headers,
          meta: action.payload.meta
        }
      }
    case GET_ADMIN_AVAILABLE_HEADERS_FAILURE:
      return { ...state, isFetching: false }
    case GET_ADMIN_AVAILABLE_SKILLS:
      return { ...state, isFetching: true }
    case GET_ADMIN_AVAILABLE_SKILLS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        skills: {
          items: action.payload.headerSkills,
          meta: action.payload.meta
        }
      }
    case GET_ADMIN_AVAILABLE_SKILLS_FAILURE:
      return { ...state, isFetching: false }
    case CREATE_ADMIN_CHARACTER_HEADER_SUCCESS:
      return initialState
    case CREATE_ADMIN_CHARACTER_SKILL_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default adminCharacterOptions
