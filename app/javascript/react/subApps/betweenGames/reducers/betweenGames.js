import {
  GET_BETWEEN_GAMES,
  GET_BETWEEN_GAMES_SUCCESS,
  GET_BETWEEN_GAMES_FAILURE
} from '../actions/getBetweenGames'

import {
  GET_BGS,
  GET_BGS_SUCCESS,
  GET_BGS_FAILURE
} from '../actions/getBgs'

import {
  CREATE_FEEDBACK_SUCCESS
} from '../actions/createFeedback'

import {
  CREATE_BGS_SUCCESS
} from '../actions/createBgs'

import {
  LOCK_BGS,
  LOCK_BGS_SUCCESS,
  LOCK_BGS_FAILURE
} from '../actions/lockBgs'

import {
  UPDATE_BGS_SUCCESS
} from '../actions/updateBgs'

const initialState = {
  bgs: {},
  futureBookings: [],
  pastBookings: [],
  meta: {},
  isFetching: false,
  isFetchingBgs: false,
  isFetchingBgsLock: false
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
    case GET_BGS:
      return { ...state, isFetchingBgs: true }
    case GET_BGS_SUCCESS:
      return {
        ...state,
        bgs: action.result.betweenGame,
        isFetchingBgs: false
      }
    case GET_BGS_FAILURE:
      return { ...state, isFetchingBgs: false }
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
    case LOCK_BGS:
      return { ...state, isFetchingBgsLock: true }
    case LOCK_BGS_SUCCESS:
      return {
        ...state,
        bgs: action.bgs,
        futureBookings: [],
        pastBookings: [],
        isFetchingBgsLock: false
      }
    case LOCK_BGS_FAILURE:
      return { ...state, isFetchingBgsLock: false }
    case UPDATE_BGS_SUCCESS:
      updatedFutureBookings = state.futureBookings.map(booking => {
        if (booking.id === action.booking.id) {
          return { ...booking, ... action.booking }
        }
        return booking
      })
      return {
        ...state,
        bgs: {},
        futureBookings: updatedFutureBookings
      }
    default:
      return state
  }
}

export default BetweenGames
