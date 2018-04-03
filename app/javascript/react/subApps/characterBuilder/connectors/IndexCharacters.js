import React from 'react'
import { connect } from 'react-redux'

import IndexCharactersContainer from '../containers/IndexCharactersContainer'
import { deleteCharacter } from '../actions/deleteCharacter'
import { getCharacters } from '../actions/getCharacters'

const mapStateToProps = state => {
  return {
    characters: state.characters.index
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCharacter: (id) => { dispatch(deleteCharacter(id)) },
    getCharacters: () => { dispatch(getCharacters()) }
  }
}

const IndexCharacters = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexCharactersContainer)

export default IndexCharacters
