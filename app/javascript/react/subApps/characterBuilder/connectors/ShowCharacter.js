import React from 'react'
import { connect } from 'react-redux'

import ShowCharacterContainer from '../containers/ShowCharacterContainer'

const mapStateToProps = (state, ownProps) => {
  let character = state.characters.items.filter(character =>
    { if (character.id == ownProps.match.params.characterId)
      { return character }
    }
  )[0]

  return {
    character: character
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ShowCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCharacterContainer)

export default ShowCharacter
