import React from 'react'
import { connect } from 'react-redux'

import RequestPasswordResetForm from '../forms/RequestPasswordResetForm'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
  }
}

const RequestPasswordReset = connect(
  mapStateToProps
)(RequestPasswordResetForm)

export default RequestPasswordReset
