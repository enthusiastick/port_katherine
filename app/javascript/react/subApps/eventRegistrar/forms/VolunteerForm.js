import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import VolunteerFormContainer from '../containers/VolunteerFormContainer'

import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { createVolunteerRegistration } from '../actions/createRegistration'

let validate = values => {
  let errors = {}

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(createVolunteerRegistration(values))
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

const VolunteerForm = props => {
  let initialValues = {
    event: props.match.params.eventSlug,
    user: props.currentUser.handle,
    userSelfReport: props.currentUser.selfReport
  }

  const ConnectedVolunteerForm = reduxForm({
    form: 'volunteer',
    validate,
    onSubmit,
    initialValues
  })(VolunteerFormContainer)

  return(
    <ConnectedVolunteerForm
      clearNotices={props.clearNotices}
      currentUser={props.currentUser}
      event={props.event}
      eventSlug={props.match.params.eventSlug}
      flashNotice={props.flashNotice}
      getEvents={props.getEvents}
      push={props.push}
    />
  )
}

export default VolunteerForm
