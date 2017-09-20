import React from 'react'
import { connect } from 'react-redux'

import SignUpForm from '../forms/SignUpForm'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
  }
}

const SignUp = connect(
  mapStateToProps
)(SignUpForm)

export default SignUp
