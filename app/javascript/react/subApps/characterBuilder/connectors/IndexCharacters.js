import React from 'react'
import { connect } from 'react-redux'

import IndexCharactersContainer from '../containers/IndexCharactersContainer'
import { getCharacters } from '../actions/getCharacters'

const mapStateToProps = state => {
  return {
    characters: state.characters.index
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: () => { dispatch(getCharacters()) }
  }
}

const IndexCharacters = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexCharactersContainer)

export default IndexCharacters
