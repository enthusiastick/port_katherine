import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'

import EditBackstoryFormContainer from '../containers/EditBackstoryFormContainer'

let validate = values => {
  let errors = {}

  return errors
}

const EditBackstoryForm = reduxForm({
  form: 'EditBackstory',
  validate
})(EditBackstoryFormContainer)

export default EditBackstoryForm
