import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { editCharacter } from '../actions/editCharacter'
import { updateBackstory } from '../actions/updateBackstory'

import EditBackstoryForm from '../forms/EditBackstoryForm'

import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'

const mapStateToProps = (state, ownProps) => {
  if (!state.characters.edit.id) {
    return {
      character: state.characters.edit,
      characterId: ownProps.match.params.characterId,
      isSignedIn: isSignedIn(state)
    }
  }

  const initialValues = {
    body: state.characters.edit.backstory,
    characterId: ownProps.match.params.characterId
  }

  return {
    character: state.characters.edit,
    characterId: ownProps.match.params.characterId,
    initialValues: initialValues,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCharacter: id => { dispatch(editCharacter(id)) },
    flashNotice: notice => { dispatch(flashNotice(notice)) },
    push: path => { dispatch(push(path)) },
    updateBackstory: values => {
      dispatch(updateBackstory(values))
    }
  }
}

const EditBackstory = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBackstoryForm)

export default EditBackstory
