import { connect } from 'react-redux'

import FeedbackEditContainer from '../../containers/feedback/EditContainer'
import { authenticateSignedInUser } from '../../../../sharedResources/actions/authenticateUser'
import { createFeedback } from '../../actions/createFeedback'
import { getBetweenGames } from '../../actions/getBetweenGames'
import { pastBookingByEventSlug } from '../../selectors/betweenGames'
import { isSignedIn } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    booking: pastBookingByEventSlug(state, ownProps),
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

const FeedbackEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackEditContainer)

export default FeedbackEdit
