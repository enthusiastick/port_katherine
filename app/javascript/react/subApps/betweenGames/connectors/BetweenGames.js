import { connect } from 'react-redux'

import BetweenGamesContainer from '../containers/BetweenGamesContainer'
import { authenticateSignedInUser } from '../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../actions/getBetweenGames'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    futureBookings: state.betweenGames.futureBookings,
    pastBookings: state.betweenGames.pastBookings,
    meta: state.betweenGames.meta,
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

const BetweenGames = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetweenGamesContainer)

export default BetweenGames
