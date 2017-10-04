import React from 'react'
import { reduxForm, reset } from 'redux-form'
import { push } from 'react-router-redux'

import PasswordResetFormContainer from '../containers/PasswordResetFormContainer'

import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { updatePasswordReset } from '../actions/updatePasswordReset'

let validate = values => {
  let errors = {}

  if (!values.password) {
    errors.password = 'can\'t be blank'
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'can\'t be blank'
  } else if (values.passwordConfirmation != values.password) {
    errors.passwordConfirmation = 'must match password'
  }

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(updatePasswordReset(values))
  .then(data => {
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Your password has been successfully reset.' }))
    dispatch(push('/sign-in'))
  })
  .catch(error => {
    dispatch(reset('passwordReset'))
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: error }))
  })
}

const PasswordResetForm = props => {
  let initialValues = {
    email: props.email,
    passwordResetId: props.passwordResetId
  }

  const ConnectedPasswordResetForm = reduxForm({
      form: 'passwordReset',
      validate,
      onSubmit,
      initialValues
  })(PasswordResetFormContainer)

  return(
    <ConnectedPasswordResetForm currentUser={props.currentUser} />
  )
}

export default PasswordResetForm
