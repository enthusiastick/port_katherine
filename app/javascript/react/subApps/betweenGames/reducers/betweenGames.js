import {
  GET_BETWEEN_GAMES,
  GET_BETWEEN_GAMES_SUCCESS,
  GET_BETWEEN_GAMES_FAILURE
} from '../actions/getBetweenGames'

import {
  CREATE_FEEDBACK_SUCCESS
} from '../actions/createFeedback'


const initialState = {
  bookings: [],
  isFetching: false
}

const BetweenGames = (state = initialState, action) => {
  switch (action.type) {
    case GET_BETWEEN_GAMES:
      return { ...state, isFetching: true }
    case GET_BETWEEN_GAMES_SUCCESS:
      return { ...state, bookings: action.betweenGames.bookings, isFetching: false }
    case GET_BETWEEN_GAMES_FAILURE:
      return { ...state, isFetching: false }
    case CREATE_FEEDBACK_SUCCESS:
      const updatedBookings = state.bookings.map(booking => {
        if (booking.id === action.booking.id) {
          return { ...booking, ...action.booking }
        }
        return booking
      })
      return {
        ...state,
        bookings: updatedBookings
      }
    default:
      return state
  }
}

export default BetweenGames
