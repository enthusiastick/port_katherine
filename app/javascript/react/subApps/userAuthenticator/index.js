import React from 'react'
import { Route } from 'react-router'

import AccountConfirmation    from './connectors/AccountConfirmation'
import EditUser               from './connectors/EditUser'
import PasswordReset          from './connectors/PasswordReset'
import RequestPasswordReset   from './connectors/RequestPasswordReset'
import SignIn                 from './connectors/SignIn'
import SignOut                from './connectors/SignOut'
import SignUp                 from './connectors/SignUp'

const UserAuthenticator = props => {
  return(
    <div>
      <Route exact path='/account_confirmations/:confirmationToken/edit' component={AccountConfirmation} />
      <Route exact path='/edit-user' component={EditUser} />
      <Route exact path='/password_resets/:passwordResetId/edit' component={PasswordReset} />
      <Route exact path='/password_resets/new' component={RequestPasswordReset} />
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/sign-out' component={SignOut} />
      <Route exact path='/sign-up' component={SignUp} />
    </div>
  )
}

export default UserAuthenticator
