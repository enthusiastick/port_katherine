import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const GET_BETWEEN_GAMES = 'GET_BETWEEN_GAMES'
const GET_BETWEEN_GAMES_SUCCESS = 'GET_BETWEEN_GAMES_SUCCESS'
const GET_BETWEEN_GAMES_FAILURE = 'GET_BETWEEN_GAMES_FAILURE'

export {
  GET_BETWEEN_GAMES,
  GET_BETWEEN_GAMES_SUCCESS,
  GET_BETWEEN_GAMES_FAILURE
}

const fetchBetweenGames = () => {
  return {
    type: GET_BETWEEN_GAMES
  }
}

const getBetweenGamesSuccess = betweenGames => {
  return {
    type: GET_BETWEEN_GAMES_SUCCESS,
    betweenGames
  }
}

const getBetweenGamesFailure = () => {
  return {
    type: GET_BETWEEN_GAMES_FAILURE
  }
}

const getBetweenGames = () => dispatch => {
  dispatch(fetchBetweenGames())
  return fetch(`${baseUrl}/api/v1/between_games.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getBetweenGamesSuccess(result.betweenGames))
  })
  .catch(error => { dispatch(getBetweenGamesFailure()) })
}

export {
  getBetweenGames
}
