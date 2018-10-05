import {
  GET_ADMIN_SKILLS,
  GET_ADMIN_SKILLS_SUCCESS,
  GET_ADMIN_SKILLS_FAILURE
} from '../actions/getAdminSkills'

import {
  EDIT_ADMIN_SKILL,
  EDIT_ADMIN_SKILL_SUCCESS,
  EDIT_ADMIN_SKILL_FAILURE
} from '../actions/editAdminSkill'

import {
  SHOW_ADMIN_SKILL,
  SHOW_ADMIN_SKILL_SUCCESS,
  SHOW_ADMIN_SKILL_FAILURE
} from '../actions/showAdminSkill'

const initialState = {
  edit: {},
  index: [],
  isFetching: false,
  show: {}
}

const adminSkills = (state = initialState, action) => {
  switch(action.type) {
    case GET_ADMIN_SKILLS:
      return { ...state, isFetching: true }
    case GET_ADMIN_SKILLS_SUCCESS:
      return {
        ...state,
        index: action.index.skills,
        isFetching: false
      }
    case GET_ADMIN_SKILLS_FAILURE:
      return { ...state, isFetching: false }
    case EDIT_ADMIN_SKILL:
      return { ...state, isFetching: true }
    case EDIT_ADMIN_SKILL_SUCCESS:
      return {
        ...state,
        edit: action.edit.skill,
        isFetching: false
      }
    case EDIT_ADMIN_SKILL_FAILURE:
     return { ...state, isFetching: false }
    case SHOW_ADMIN_SKILL:
      return { ...state, isFetching: true }
    case SHOW_ADMIN_SKILL_SUCCESS:
      return {
        ...state,
        show: action.show.skill,
        isFetching: false
      }
    case SHOW_ADMIN_SKILL_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

export default adminSkills
