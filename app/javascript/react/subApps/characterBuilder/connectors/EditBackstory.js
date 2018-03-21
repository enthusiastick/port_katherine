import React from 'react'
import { connect } from 'react-redux'

import { editCharacter } from '../actions/editCharacter'

import EditBackstoryForm from '../forms/EditBackstoryForm'

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.characters.edit,
    characterId: ownProps.match.params.characterId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCharacter: id => { dispatch(editCharacter(id)) }
  }
}

const EditBackstory = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBackstoryForm)

export default EditBackstory
