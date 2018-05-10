import React from 'react'
import { connect } from 'react-redux'

import { authenticateSignedInUser } from '../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../actions/getBetweenGames'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    isFetching: state.betweenGames.isFetching,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInUser: authorized => { dispatch(authenticateSignedInUser(authorized)) },
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const BgsNewContainer = props => {
  return <h1>Boo Yaa</h1>
}

const BgsNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsNewContainer)

export default BgsNew
