import { connect } from 'react-redux'
import { push } from 'react-router-redux'

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

import { calculateCostOfDelta, determineEligibility } from '../selectors/editCharacter'

import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'

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
    isSignedIn: isSignedIn(state),
    saveEligible: determineEligibility(state),
    selectedHeaders: selectedHeaders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addHeader: headerId => { dispatch(addHeader(headerId)) },
    changeCharacterSkill: (characterSkillId, amount) => { dispatch(changeCharacterSkill(characterSkillId, amount)) },
    changeSkill: (skillId, amount) => { dispatch(changeSkill(skillId, amount)) },
    editCharacter: id => { dispatch(editCharacter(id)) },
    flashNotice: notice => {dispatch(flashNotice(notice)) },
    push: path => { dispatch(push(path)) },
    removeCharacterSkill: characterSkillId => { dispatch(removeCharacterSkill(characterSkillId)) },
    removeHeader: headerId => { dispatch(removeHeader(headerId)) },
    removeSkill: skillId => { dispatch(removeSkill(skillId)) },
    updateCharacter: (values, isAdmin) => { dispatch(updateCharacter(values, isAdmin)) }
  }
}

const EditCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCharacterContainer)

export default EditCharacter
