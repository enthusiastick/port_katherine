import React from 'react'
import { connect } from 'react-redux'

import SignInForm from '../forms/SignInForm'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
  }
}

const SignIn = connect(
  mapStateToProps
)(SignInForm)

export default SignIn
