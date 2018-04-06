import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ShowCharacterContainer from '../containers/ShowCharacterContainer'
import { getCharacter } from '../actions/getCharacter'

import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.characters.show,
    characterId: ownProps.match.params.characterId,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getCharacter: (id) => { dispatch(getCharacter(id)) },
    push: (path) => { dispatch(push(path)) }

  }
}

const ShowCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCharacterContainer)

export default ShowCharacter
