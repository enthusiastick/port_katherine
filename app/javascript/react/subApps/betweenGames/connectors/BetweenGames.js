import { connect } from 'react-redux'

import BetweenGamesContainer from '../containers/BetweenGamesContainer'
import { authenticateSignedInUser } from '../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../actions/getBetweenGames'
import { feedbackCompletedBookings } from '../selectors/betweenGames'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    bookings: feedbackCompletedBookings(state),
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
