import React from 'react'
import { connect } from 'react-redux'

import { editCharacter } from '../actions/editCharacter'
import { updateBackstory } from '../actions/updateBackstory'

import EditBackstoryForm from '../forms/EditBackstoryForm'

const mapStateToProps = (state, ownProps) => {
  if (state.characters.edit.id) {
    let initialValues = {
      body: state.characters.edit.backstory,
      characterId: ownProps.match.params.characterId
    }

    return {
      character: state.characters.edit,
      characterId: ownProps.match.params.characterId,
      initialValues: initialValues
    }
  } else {
    return {
      character: state.characters.edit,
      characterId: ownProps.match.params.characterId
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCharacter: id => { dispatch(editCharacter(id)) },
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
