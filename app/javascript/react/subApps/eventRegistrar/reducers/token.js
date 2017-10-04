import { FETCH_TOKEN, FETCH_TOKEN_SUCCESS } from '../actions/getToken'

let initialState = {
  isFetching: false,
  item: null
}

const token = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TOKEN:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.token
      })
    default:
      return state
  }
}

export default token
