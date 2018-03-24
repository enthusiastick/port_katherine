import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AdminShowCharacterContainer from '../containers/AdminShowCharacterContainer'
import { getCharacter } from '../../../characterBuilder/actions/getCharacter'

import { flashNotice } from '../../../../sharedResources/actions/flashNotice'

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.adminCharacters.show,
    characterId: ownProps.match.params.characterId,
    currentUser: state.currentUser.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getCharacter: (id) => { dispatch(getCharacter(id)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminShowCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminShowCharacterContainer)

export default AdminShowCharacter
