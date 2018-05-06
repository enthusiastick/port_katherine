import { connect } from 'react-redux'

import FeedbackShowContainer from '../containers/FeedbackShowContainer'
import { authenticateSignedInUser } from '../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../actions/getBetweenGames'
import { bookingByEventSlug } from '../selectors/betweenGames'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    booking: bookingByEventSlug(state, ownProps),
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

const FeedbackShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackShowContainer)

export default FeedbackShow
