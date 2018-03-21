import React from 'react'
import { reduxForm } from 'redux-form'

import NewCharacterContainer from '../containers/NewCharacterContainer'

let validate = values => {
  let errors = {}

  if (!values.name) {
    errors.name = 'can\'t be blank'
  }

  return errors
}

const NewCharacterForm = reduxForm({
  form: 'newCharacter',
  validate
})(NewCharacterContainer)

export default NewCharacterForm
