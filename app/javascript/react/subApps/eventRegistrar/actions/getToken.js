import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_TOKEN = 'FETCH_TOKEN'
const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS'

export { FETCH_TOKEN, FETCH_TOKEN_SUCCESS }

let fetchToken = () => {
  return {
    type: FETCH_TOKEN
  }
}

let fetchTokenSuccess = token => {
  return {
    type: FETCH_TOKEN_SUCCESS,
    token
  }
}

let getToken = () => dispatch => {
  dispatch(fetchToken())
  return fetch(`${baseUrl}/api/v1/client_token.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchTokenSuccess(data.token)) })
}

export {
  getToken,
  fetchToken,
  fetchTokenSuccess
}
