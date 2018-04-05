import React from 'react'
import { connect } from 'react-redux'

import IndexCharactersContainer from '../containers/IndexCharactersContainer'
import { deleteCharacter } from '../actions/deleteCharacter'
import { getCharacters } from '../actions/getCharacters'
import { updateDefaultCharacter } from '../actions/updateDefaultCharacter'

const mapStateToProps = state => {
  return {
    characters: state.characters.index,
    defaultCharacterId: state.characters.defaultCharacterId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCharacter: (id) => { dispatch(deleteCharacter(id)) },
    getCharacters: () => { dispatch(getCharacters()) },
    updateDefaultCharacter: (id) => { dispatch(updateDefaultCharacter(id)) }
  }
}

const IndexCharacters = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexCharactersContainer)

export default IndexCharacters
