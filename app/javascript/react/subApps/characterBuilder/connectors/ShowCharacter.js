import React from 'react'
import { connect } from 'react-redux'

import ShowCharacterContainer from '../containers/ShowCharacterContainer'
import { getCharacter } from '../actions/getCharacter'

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.characters.show,
    characterId: ownProps.match.params.characterId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCharacter: (id) => { dispatch(getCharacter(id)) }
  }
}

const ShowCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCharacterContainer)

export default ShowCharacter
