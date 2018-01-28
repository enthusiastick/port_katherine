import React from 'react'
import { connect } from 'react-redux'

import {
  addHeader,
  changeCharacterSkill,
  changeSkill,
  removeCharacterSkill,
  removeHeader,
  removeSkill
} from '../actions/draftChanges'

import EditCharacterContainer from '../containers/EditCharacterContainer'
import { editCharacter } from '../actions/editCharacter'
import { updateCharacter } from '../actions/updateCharacter'

import { calculateCostOfDelta } from '../selectors/delta'

const mapStateToProps = (state, ownProps) => {
  let availableHeaders = []
  let selectedHeaders = []

  if (state.characters.edit.headers) {
    selectedHeaders = state.characters.edit.headers.filter(header => {
      if (header.characterHeaderId || state.delta.newHeaders.includes(header.headerId)) {
        return header
      }
    })
    availableHeaders = state.characters.edit.headers.filter(header => {
      if (!header.characterHeaderId && !state.delta.newHeaders.includes(header.headerId)) {
        return header
      }
    })
  }

  return {
    availableHeaders: availableHeaders,
    character: state.characters.edit,
    characterId: ownProps.match.params.characterId,
    costOfDelta: calculateCostOfDelta(state),
    delta: state.delta,
    selectedHeaders: selectedHeaders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addHeader: headerId => { dispatch(addHeader(headerId)) },
    changeCharacterSkill: (characterSkillId, amount) => { dispatch(changeCharacterSkill(characterSkillId, amount)) },
    changeSkill: (skillId, amount) => { dispatch(changeSkill(skillId, amount)) },
    editCharacter: id => { dispatch(editCharacter(id)) },
    removeCharacterSkill: characterSkillId => { dispatch(removeCharacterSkill(characterSkillId)) },
    removeHeader: headerId => { dispatch(removeHeader(headerId)) },
    removeSkill: skillId => { dispatch(removeSkill(skillId)) },
    updateCharacter: values => { dispatch(updateCharacter(values, dispatch)) }
  }
}

const EditCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCharacterContainer)

export default EditCharacter
