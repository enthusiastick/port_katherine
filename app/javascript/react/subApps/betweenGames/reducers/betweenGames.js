import {
  GET_BETWEEN_GAMES,
  GET_BETWEEN_GAMES_SUCCESS,
  GET_BETWEEN_GAMES_FAILURE
} from '../actions/getBetweenGames'

import {
  CREATE_FEEDBACK_SUCCESS
} from '../actions/createFeedback'


const initialState = {
  futureBookings: [],
  pastBookings: [],
  isFetching: false
}

const BetweenGames = (state = initialState, action) => {
  switch (action.type) {
    case GET_BETWEEN_GAMES:
      return { ...state, isFetching: true }
    case GET_BETWEEN_GAMES_SUCCESS:
      return { ...state, ...action.betweenGames, isFetching: false }
    case GET_BETWEEN_GAMES_FAILURE:
      return { ...state, isFetching: false }
    case CREATE_FEEDBACK_SUCCESS:
      const updatedBookings = state.pastBookings.map(booking => {
        if (booking.id === action.booking.id) {
          return { ...booking, ...action.booking }
        }
        return booking
      })
      return {
        ...state,
        pastBookings: updatedBookings
      }
    default:
      return state
  }
}

export default BetweenGames
