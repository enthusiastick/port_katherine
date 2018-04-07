import {
  GET_NEXT_EVENT,
  GET_NEXT_EVENT_SUCCESS,
  GET_NEXT_EVENT_FAILURE
} from '../actions/getNextEvent'

const initialState = {
  isFetchingNextEvent: false,
  nextEvent: {}
}

const homepage = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEXT_EVENT:
      return { ...state, isFetchingNextEvent: true }
    case GET_NEXT_EVENT_SUCCESS:
      return { ...state,
        isFetchingNextEvent: false,
        nextEvent: action.nextEvent
      }
    case GET_NEXT_EVENT_FAILURE:
      return { ...state, isFetchingNextEvent: false }
    default:
      return state
  }
}

export default homepage
