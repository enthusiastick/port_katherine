import { connect } from 'react-redux'

import FeedbackNewContainer from '../containers/FeedbackNewContainer'
import { authenticateSignedInUser } from '../../../sharedResources/actions/authenticateUser'
import { createFeedback } from '../actions/createFeedback'
import { getBetweenGames } from '../actions/getBetweenGames'
import { feedbackEligibleBookings } from '../selectors/betweenGames'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    bookings: feedbackEligibleBookings(state),
    isFetching: state.betweenGames.isFetching,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInUser: authorized => { dispatch(authenticateSignedInUser(authorized)) },
    createFeedback: values => { dispatch(createFeedback(values)) },
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const FeedbackNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackNewContainer)

export default FeedbackNew
