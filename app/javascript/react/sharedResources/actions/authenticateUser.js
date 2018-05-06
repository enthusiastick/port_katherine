import { push } from 'react-router-redux'

import { flashNotice, clearNotices } from './flashNotice'

const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
const USER_NOT_AUTHENTICATED = 'USER_NOT_AUTHENTICATED'

export const authenticateSignedInUser = authorized => dispatch => {
  if (!authorized) {
    dispatch(push('/sign-in'))
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'You must be signed in to continue.' }))

    return { type: USER_NOT_AUTHENTICATED }
  }

  return { type: AUTHENTICATE_USER }
}
