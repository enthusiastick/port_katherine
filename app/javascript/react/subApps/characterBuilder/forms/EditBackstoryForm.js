import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import EditBackstoryFormContainer from '../containers/EditBackstoryFormContainer'

import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { updateBackstory } from '../actions/updateBackstory'

let validate = values => {
  let errors = {}

  return errors
}

let onSubmit = (values, dispatch) => {
  return dispatch(updateBackstory(values))
  .then(data => {
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Backstory updated successfully.' }))
    dispatch(push(`/characters/${data.characterId}/edit`))
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

const EditBackstoryForm = props => {
  let initialValues = {
    body: props.character.backstory,
    characterId: props.characterId
  }

  const ConnectedEditBackstoryForm = reduxForm({
    form: 'editBackstory',
    validate,
    onSubmit,
    initialValues
  })(EditBackstoryFormContainer)

  return(
    <ConnectedEditBackstoryForm
      character={props.character}
      characterId={props.characterId}
      currentUser={props.currentUser}
      editCharacter={props.editCharacter}
    />
  )
}

export default EditBackstoryForm
