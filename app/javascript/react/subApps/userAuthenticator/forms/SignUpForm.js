import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import SignUpFormContainer from '../containers/SignUpFormContainer'

import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { createUser } from '../actions/createUser'

let validate = values => {
  let errors = {}

  if (!values.handle) {
    errors.handle = 'can\'t be blank'
  }
  if (!values.email) {
    errors.email = 'can\'t be blank'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'not valid'
  }
  if (!values.firstName) {
    errors.firstName = 'can\'t be blank'
  }
  if (!values.lastName) {
    errors.lastName = 'can\'t be blank'
  }
  if (!values.password) {
    errors.password = 'can\'t be blank'
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'can\'t be blank'
  } else if (values.passwordConfirmation != values.password) {
    errors.passwordConfirmation = 'must match password'
  }
  if (!values.reCaptchaResponse) {
    errors.reCaptchaResponse = 'please prove you\'re not a robot'
  }

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(createUser(values))
  .then(data => {
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Registration successful. Please confirm your email to activate your account.' }))
    dispatch(push('/'))
  })
  .catch(errors => {
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem with your registration.' }))
    let submissionErrors = {}
    for (let prop of Object.keys(errors)) {
      submissionErrors[prop] = errors[prop]
    }
    throw new SubmissionError(submissionErrors)
  })
}

const SignUpForm = props => {
  const ConnectedSignUpForm = reduxForm({
    form: 'signUp',
    validate,
    onSubmit
  })(SignUpFormContainer)

  return(
    <ConnectedSignUpForm currentUser={props.currentUser} />
  )
}

export default SignUpForm
