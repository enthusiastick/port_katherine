import React from 'react'
import { reduxForm } from 'redux-form'

import RegistrationFormContainer from '../containers/RegistrationFormContainer'

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
  console.log(values)
}


const RegistrationForm = props => {
  let initialValues = {
    cardholderName: `${props.currentUser.firstName} ${props.currentUser.lastName}`,
    user: props.currentUser.handle
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
      currentUser={props.currentUser}
      event={props.event}
      eventSlug={props.match.params.eventSlug}
      getEvents={props.getEvents}
    />
  )
}

export default RegistrationForm
