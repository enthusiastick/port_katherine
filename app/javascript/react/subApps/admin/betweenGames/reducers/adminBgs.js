import {
  GET_ADMIN_BGS,
  GET_ADMIN_BGS_SUCCESS,
  GET_ADMIN_BGS_FAILURE
} from '../actions/getAdminBgs'

import {
  SHOW_ADMIN_BGS,
  SHOW_ADMIN_BGS_SUCCESS,
  SHOW_ADMIN_BGS_FAILURE
} from '../actions/showAdminBgs'

import {
  UPDATE_ADMIN_BGS_ASSIGNEE,
  UPDATE_ADMIN_BGS_ASSIGNEE_SUCCESS,
  UPDATE_ADMIN_BGS_ASSIGNEE_FAILURE
} from '../actions/updateAdminBgsAssignee'

const initialState = {
  hasUpdatedAssignee: false,
  index: [],
  show: {
    comments: []
  },
  meta: {
    users: []
  },
  isFetching: false
}

const adminBgs = (state = initialState, action) => {
  switch(action.type) {
    case GET_ADMIN_BGS:
      return { ...state, isFetching: true }
    case GET_ADMIN_BGS_SUCCESS:
      return { ...state, index: action.index, isFetching: false }
    case GET_ADMIN_BGS_FAILURE:
      return { ...state, isFetching: false }
    case SHOW_ADMIN_BGS:
      return { ...state, hasUpdatedAssignee: false, isFetching: true }
    case SHOW_ADMIN_BGS_SUCCESS:
      return {
        ...state,
        hasUpdatedAssignee: false,
        meta: action.show.meta,
        show: action.show.betweenGame,
        isFetching: false
      }
    case SHOW_ADMIN_BGS_FAILURE:
      return { ...state, hasUpdatedAssignee: false, isFetching: false }
    case UPDATE_ADMIN_BGS_ASSIGNEE:
      return { ...state, hasUpdatedAssignee: false }
    case UPDATE_ADMIN_BGS_ASSIGNEE_SUCCESS:
      return {
        ...state,
        hasUpdatedAssignee: true,
        show: action.show.betweenGame,
        isFetching: false
      }
    case UPDATE_ADMIN_BGS_ASSIGNEE_FAILURE:
      return { ...state, hasUpdatedAssignee: false }
    default:
      return state
  }
}

export default adminBgs
