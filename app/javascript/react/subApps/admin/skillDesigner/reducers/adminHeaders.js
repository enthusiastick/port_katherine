import {
  SHOW_ADMIN_HEADER,
  SHOW_ADMIN_HEADER_SUCCESS,
  SHOW_ADMIN_HEADER_FAILURE
} from '../actions/showAdminHeader'

const initialState = {
  isFetching: false,
  show: {}
}

const adminHeaders = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_ADMIN_HEADER:
      return { ...state, isFetching: true }
    case SHOW_ADMIN_HEADER_SUCCESS:
      return {
        ...state,
        show: action.show.header,
        isFetching: false
      }
    case SHOW_ADMIN_HEADER_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

export default adminHeaders
