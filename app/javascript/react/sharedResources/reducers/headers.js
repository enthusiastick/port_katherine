import {
  FETCH_HEADERS,
  FETCH_HEADERS_SUCCESS,
  FETCH_HEADERS_FAILURE
} from '../actions/getHeaders'

let initialState = {
  isFetching: false,
  item: {}
}

const headers = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_HEADERS:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_HEADERS_SUCCESS:
      return Object.assign({}, state, { item: action.headers })
    case FETCH_HEADERS_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}

export default headers
