import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import EditUserFormContainer from '../containers/EditUserFormContainer'

import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { updateUser } from '../actions/updateUser'

let validate = values => {
  let errors = {}

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

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(updateUser(values))
  .then(data => {
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Update successful.' }))
    dispatch(push('/'))
  })
  .catch(errors => {
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem with your update.' }))
    let submissionErrors = {}
    for (let prop of Object.keys(errors)) {
      submissionErrors[prop] = errors[prop]
    }
    throw new SubmissionError(submissionErrors)
  })
}

const EditUserForm = props => {
  let initialValues = {
    email: props.currentUser.email,
    handle: props.currentUser.handle,
    firstName: props.currentUser.firstName,
    lastName: props.currentUser.lastName,
    selfReport: props.currentUser.selfReport
  }

  const ConnectedEditUserForm = reduxForm({
    form: 'editUser',
    validate,
    onSubmit,
    initialValues
  })(EditUserFormContainer)

  return(
    <ConnectedEditUserForm currentUser={props.currentUser} />
  )
}

export default EditUserForm
