import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import IndexTalliesContainer from '../containers/IndexTalliesContainer'
import { getTallies } from '../actions/getTallies'

import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    tallies: state.characters.tallies,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTallies: id => { dispatch(getTallies(id)) },
    flashNotice: notice => { dispatch(flashNotice(notice)) },
    push: path => { dispatch(push(path)) }
  }
}

const IndexTallies = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexTalliesContainer)

export default IndexTallies
