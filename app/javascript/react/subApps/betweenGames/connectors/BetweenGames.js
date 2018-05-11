import { connect } from 'react-redux'

import BetweenGamesContainer from '../containers/BetweenGamesContainer'
import { authenticateSignedInUser } from '../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../actions/getBetweenGames'
import { bookingsWithBgs, feedbackCompletedBookings } from '../selectors/betweenGames'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    bookingsWithBgs: bookingsWithBgs(state),
    feedbackCompletedBookings: feedbackCompletedBookings(state),
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
