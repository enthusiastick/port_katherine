import {
  GET_ADMIN_SKILLS,
  GET_ADMIN_SKILLS_SUCCESS,
  GET_ADMIN_SKILLS_FAILURE
} from '../actions/getAdminSkills'

const initialState = {
  index: [],
  isFetching: false
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
    default:
      return state
  }
}

export default adminSkills
