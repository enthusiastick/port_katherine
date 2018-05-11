import {
  GET_BETWEEN_GAMES,
  GET_BETWEEN_GAMES_SUCCESS,
  GET_BETWEEN_GAMES_FAILURE
} from '../actions/getBetweenGames'

import {
  CREATE_FEEDBACK_SUCCESS
} from '../actions/createFeedback'

import {
  CREATE_BGS_SUCCESS
} from '../actions/createBgs'

import {
  UPDATE_BGS_SUCCESS
} from '../actions/updateBgs'

const initialState = {
  futureBookings: [],
  pastBookings: [],
  meta: {},
  isFetching: false
}

const BetweenGames = (state = initialState, action) => {
  let updatedFutureBookings

  switch (action.type) {
    case GET_BETWEEN_GAMES:
      return { ...state, isFetching: true }
    case GET_BETWEEN_GAMES_SUCCESS:
      return { ...state, ...action.betweenGames, isFetching: false }
    case GET_BETWEEN_GAMES_FAILURE:
      return { ...state, isFetching: false }
    case CREATE_BGS_SUCCESS:
      updatedFutureBookings = state.futureBookings.map(booking => {
        if (booking.id === action.booking.id) {
          return { ...booking, ... action.booking }
        }
        return booking
      })
      return {
        ...state,
        futureBookings: updatedFutureBookings
      }
    case CREATE_FEEDBACK_SUCCESS:
      const updatedPastBookings = state.pastBookings.map(booking => {
        if (booking.id === action.booking.id) {
          return { ...booking, ...action.booking }
        }
        return booking
      })
      return {
        ...state,
        pastBookings: updatedPastBookings
      }
    case UPDATE_BGS_SUCCESS:
      updatedFutureBookings = state.futureBookings.map(booking => {
        if (booking.id === action.booking.id) {
          return { ...booking, ... action.booking }
        }
        return booking
      })
      return {
        ...state,
        futureBookings: updatedFutureBookings
      }
    default:
      return state
  }
}

export default BetweenGames
