import React from 'react'
import { connect } from 'react-redux'

import IndexTalliesContainer from '../containers/IndexTalliesContainer'
import { getTallies } from '../actions/getTallies'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    tallies: state.characters.tallies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTallies: (id) => { dispatch(getTallies(id)) }
  }
}

const IndexTallies = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexTalliesContainer)

export default IndexTallies
