import {
  GET_ADMIN_AVAILABLE_HEADERS,
  GET_ADMIN_AVAILABLE_HEADERS_SUCCESS,
  GET_ADMIN_AVAILABLE_HEADERS_FAILURE
} from '../actions/getAdminCharacterAvailableHeaders'

const initialState = {
  isFetching: false,
  headers: { items: [], meta: {} }
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
    default:
      return state
  }
}

export default adminCharacterOptions
