import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import EventFormContainer from '../containers/EventFormContainer'

import { clearNotices, flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { updateAdminEvent } from '../actions/updateAdminEvent'

let validate = values => {
  let errors = {}

  if (!values.name) {
    errors.name = 'can\'t be blank'
  }
  if (!values.startTime) {
    errors.startTime = 'can\'t be blank'
  }
  if (!values.endTime) {
    errors.endTime = 'can\'t be blank'
  }
  if (!values.address) {
    errors.address = 'can\'t be blank'
  }
  if (!values.description) {
    errors.description = 'can\'t be blank'
  }
  if (!values.latitude) {
    errors.latitude = 'can\'t be blank'
  }
  if (!values.longitude) {
    errors.longitude = 'can\'t be blank'
  }

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(updateAdminEvent(values, values.slug))
  .then(data => {
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Event saved successfully.' }))
    dispatch(push('/admin/events'))
  })
  .catch(errors => {
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'This event could not be saved.' }))
    let submissionErrors = {}
    for (let prop of Object.keys(errors)) {
      submissionErrors[prop] = errors[prop]
    }
    throw new SubmissionError(submissionErrors)
  })
}

const EditEventForm = props => {
  let initialValues = props.event

  const ConnectedEventForm = reduxForm({
    form: 'editAdminEvent',
    validate,
    onSubmit,
    initialValues
  })(EventFormContainer)

  return(
    <ConnectedEventForm
      currentUser={props.currentUser}
      event={props.event}
      eventSlug={props.eventSlug}
      flashNotice={props.flashNotice}
      getAdminEvent={props.getAdminEvent}
      isAdmin={props.isAdmin}
      isFetching={props.isFetching}
      push={props.push}
    />
  )
}

export default EditEventForm
