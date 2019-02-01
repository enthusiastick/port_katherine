import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import LimitedRegistrationWarning from '../components/LimitedRegistrationWarning'
import RegistrationFormContainer from '../containers/RegistrationFormContainer'

import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { createRegistration } from '../actions/createRegistration'

let validate = values => {
  let errors = {}
  if (!values.cardholderName) {
    errors.cardholderName = 'can\'t be blank'
  }
  if (!values.cardNumber) {
    errors.cardNumber = 'can\'t be blank'
  }
  if (!values.expirationYear) {
    errors.expirationYear = 'please select an option'
  }
  if (!values.expirationMonth) {
    errors.expirationMonth = 'please select an option'
  }
  if (!values.cardVerification) {
    errors.cardVerification = 'can\'t be blank'
  }

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(createRegistration(values))
  .then(data => {
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Registration completed successfully.' }))
    dispatch(push('/events'))
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

const RegistrationForm = props => {
  if (props.event && props.event.showLimitedRegistrationWarning) {
    return <LimitedRegistrationWarning {...props.event} />
  }

  let initialValues = {
    cardholderName: `${props.currentUser.firstName} ${props.currentUser.lastName}`,
    user: props.currentUser.handle,
    token: props.token,
    userSelfReport: props.currentUser.selfReport
  }

  if (props.pass) {
    initialValues.pass = props.pass
  }

  const ConnectedRegistrationForm = reduxForm({
    form: 'register',
    validate,
    onSubmit,
    initialValues
  })(RegistrationFormContainer)

  return(
    <ConnectedRegistrationForm
      clearNotices={props.clearNotices}
      currentUser={props.currentUser}
      event={props.event}
      eventSlug={props.match.params.eventSlug}
      flashNotice={props.flashNotice}
      getEvents={props.getEvents}
      getToken={props.getToken}
      push={props.push}
      token={props.token}
    />
  )
}

export default RegistrationForm
