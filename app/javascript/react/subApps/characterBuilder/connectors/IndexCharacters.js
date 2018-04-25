import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import IndexCharactersContainer from '../containers/IndexCharactersContainer'
import { deleteCharacter } from '../actions/deleteCharacter'
import { getCharacters } from '../actions/getCharacters'
import { updateDefaultCharacter } from '../actions/updateDefaultCharacter'

import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'

const mapStateToProps = state => {
  return {
    characters: state.characters.index,
    defaultCharacterId: state.characters.defaultCharacterId,
    playerCpAvailable: state.characters.playerCpAvailable,
    userTallies: state.characters.userTallies,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCharacter: (id) => { dispatch(deleteCharacter(id)) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getCharacters: () => { dispatch(getCharacters()) },
    push: (path) => { dispatch(push(path)) },
    updateDefaultCharacter: (id) => { dispatch(updateDefaultCharacter(id)) }
  }
}

const IndexCharacters = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexCharactersContainer)

export default IndexCharacters
