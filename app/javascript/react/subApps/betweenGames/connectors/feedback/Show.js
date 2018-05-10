import { connect } from 'react-redux'

import FeedbackShowContainer from '../../containers/feedback/ShowContainer'
import { authenticateSignedInUser } from '../../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../../actions/getBetweenGames'
import { pastBookingByEventSlug } from '../../selectors/betweenGames'
import { isSignedIn } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    booking: pastBookingByEventSlug(state, ownProps),
    eventSlug: ownProps.match.params.eventSlug,
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
