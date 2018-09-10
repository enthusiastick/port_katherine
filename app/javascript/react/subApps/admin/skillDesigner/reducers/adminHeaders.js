import {
  GET_ADMIN_HEADERS,
  GET_ADMIN_HEADERS_SUCCESS,
  GET_ADMIN_HEADERS_FAILURE
} from '../actions/getAdminHeaders'

import {
  SHOW_ADMIN_HEADER,
  SHOW_ADMIN_HEADER_SUCCESS,
  SHOW_ADMIN_HEADER_FAILURE
} from '../actions/showAdminHeader'

const initialState = {
  index: [],
  isFetching: false,
  show: {}
}

const adminHeaders = (state = initialState, action) => {
  switch(action.type) {
    case GET_ADMIN_HEADERS:
      return { ...state, isFetching: true }
    case GET_ADMIN_HEADERS_SUCCESS:
      return {
        ...state,
        index: action.index.headers,
        isFetching: false
      }
    case GET_ADMIN_HEADERS_FAILURE:
      return { ...state, isFetching: false }
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
