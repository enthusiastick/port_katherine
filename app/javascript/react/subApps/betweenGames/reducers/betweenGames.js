import {
  GET_BETWEEN_GAMES,
  GET_BETWEEN_GAMES_SUCCESS,
  GET_BETWEEN_GAMES_FAILURE
} from '../actions/getBetweenGames'

const initialState = {
  bookings: [],
  isFetching: false
}

const BetweenGames = (state = initialState, action) => {
  switch (action.type) {
    case GET_BETWEEN_GAMES:
      return { ...state, isFetching: true }
    case GET_BETWEEN_GAMES_SUCCESS:
      return { ...state, bookings: action.betweenGames.bookings }
    case GET_BETWEEN_GAMES_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

export default BetweenGames
