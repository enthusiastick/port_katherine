import queryString from 'query-string'
import React from 'react'
import { connect } from 'react-redux'

import PasswordResetForm from '../forms/PasswordResetForm'

const mapStateToProps = (state, ownProps) => {
  return Object.assign(
    {},
    queryString.parse(state.router.location.search),
    {
      currentUser: state.currentUser.item,
      passwordResetId: ownProps.match.params.passwordResetId
    }
  )
}

const PasswordReset = connect(
  mapStateToProps
)(PasswordResetForm)

export default PasswordReset
